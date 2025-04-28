import { ArrowLeft, Monitor, PenLine, Smartphone } from 'lucide-react';
import pako from 'pako';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  setDocument,
  setSelectedScreenSize,
  useDocument,
  useSelectedMainTab,
  useSelectedScreenSize,
} from '@/documents/editor/EditorContext';
import UpsertEmailContent from '@/graphql/mutations/upsert_email_template.gql';
import GetEmailContent from '@/graphql/queries/get_email_template.gql';
import { gql, useMutation, useQuery } from '@apollo/client';
import { Reader } from '@usewaypoint/email-builder';

import EditorBlock from '../../documents/editor/EditorBlock';
import InspectorDrawer, { INSPECTOR_DRAWER_WIDTH } from '../InspectorDrawer';

import DownloadJson from './DownloadJson';
import HtmlPanel from './HtmlPanel';
import ImportJson from './ImportJson';
import JsonPanel from './JsonPanel';
import MainTabsGroup from './MainTabsGroup';
import SendEmailButton from './SendEmailButton';

const UPSERT_EMAIL_CONTENT_MUTATION = gql`
  ${UpsertEmailContent}
`;

const GET_EMAIL_CONTENT_QUERY = gql`
  ${GetEmailContent}
`;

const stringFromLargeArray = (array: Uint8Array) => {
  let result = '';
  for (let i = 0; i < array.length; i++) {
    result += String.fromCharCode(array[i]);
  }
  return result;
};

export default function TemplatePanel() {
  const [templateName, setTemplateName] = React.useState('Template name');
  const path = window.location.pathname;
  const explode = path.split('/');

  // Always call the hook
  const id = explode.length > 2 ? parseInt(explode[2]) : null;
  const { data, loading, error } = useQuery(GET_EMAIL_CONTENT_QUERY, {
    variables: {
      id,
    },
    skip: !id,
  });

  if (error) {
    window.history.pushState({ path: '/' }, '', '/email-builder-js/');
  }

  React.useEffect(() => {
    if (data && data.emailContent && data.emailContent.structContentJson) {
      let structContentJson = '';
      try {
        structContentJson = pako.inflate(
          Uint8Array.from(atob(data.emailContent.structContentJson), (c) => c.charCodeAt(0)),
          { to: 'string' }
        );
      } catch (e) {
        console.error(e);
        structContentJson = data.emailContent.structContentJson;
      }

      const json = JSON.parse(structContentJson);
      setDocument(json);
      setTemplateName(data.emailContent.name);
    }
  }, [data]);
  const document = useDocument();
  const selectedMainTab = useSelectedMainTab();
  const selectedScreenSize = useSelectedScreenSize();
  const [focus, setFocus] = React.useState(false);
  const [upsertEmailContent] = useMutation(UPSERT_EMAIL_CONTENT_MUTATION);

  let mainBoxClass = 'h-full';
  let mainBoxStyle: React.CSSProperties = {};
  if (selectedScreenSize === 'mobile') {
    mainBoxClass += ' mx-auto my-8';
    mainBoxStyle = {
      width: 370,
      height: 800,
      boxShadow:
        'rgba(33, 36, 67, 0.04) 0px 10px 20px, rgba(33, 36, 67, 0.04) 0px 2px 6px, rgba(33, 36, 67, 0.04) 0px 0px 1px',
    };
  }

  const handleScreenSizeChange = (value: unknown) => {
    switch (value) {
      case 'mobile':
      case 'desktop':
        setSelectedScreenSize(value);
        return;
      default:
        setSelectedScreenSize('desktop');
    }
  };

  const enableEdit = () => {
    setFocus(true);
  };

  const disableEdit = () => {
    setFocus(false);
  };

  const save = () => {
    // TODO: save template
    const messageCompressed = pako.deflate(JSON.stringify(document, null, '  '));
    const compressedString = btoa(stringFromLargeArray(messageCompressed));
    upsertEmailContent({
      variables: {
        name: templateName,
        structContentJson: compressedString,
        description: 'Template description',
        typeContent: 'email',
        isActive: false,
        emailContentId: id,
      },
    });

    disableEdit();
    toast('Your template have been saved successfully.');
  };

  const renderMainPanel = () => {
    switch (selectedMainTab) {
      case 'editor':
        return (
          <div className={mainBoxClass} style={mainBoxStyle}>
            <EditorBlock id="root" />
          </div>
        );
      case 'preview':
        return (
          <div className={mainBoxClass} style={mainBoxStyle}>
            <Reader document={document} rootBlockId="root" />
          </div>
        );
      case 'html':
        return <HtmlPanel />;
      case 'json':
        return <JsonPanel />;
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b h-12 flex items-center justify-between pr-4">
        <div className="flex flex-row items-center space-x-2 min-w-1/5">
          <Button variant="ghost" className="flex items-center space-x-1 h-12 rounded-none border-r">
            <ArrowLeft size={16} />
            <span className="font-semibold">Exit</span>
          </Button>

          {focus ? (
            <div className="flex flex-row items-center space-x-2">
              <Input type="text" className="w-48" value={templateName} onChange={(e) => setTemplateName(e.target.value)} />
              <Button variant="outline" className="flex items-center space-x-1" onClick={save}>
                Save
              </Button>
            </div>
          ) : (
            <div className="flex flex-row items-center space-x-2" onClick={enableEdit}>
              <Label className="">{templateName}</Label>
              <PenLine size={16} />
            </div>
          )}
        </div>
        <div className="flex flex-row space-x-2">
          <MainTabsGroup />
        </div>
        <div className="flex flex-row space-x-2 items-center">
          <DownloadJson />
          <ImportJson />
          <ToggleGroup
            type="single"
            value={selectedScreenSize}
            onValueChange={handleScreenSizeChange}
            className="space-x-1"
          >
            <ToggleGroupItem value="desktop" aria-label="Desktop view">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Monitor size={16} />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Desktop view</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </ToggleGroupItem>
            <ToggleGroupItem value="mobile" aria-label="Mobile view">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Smartphone size={16} />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Mobile view</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </ToggleGroupItem>
          </ToggleGroup>
          <SendEmailButton />
          <Button className="flex items-center space-x-1 bg-primary-500 hover:bg-primary-600" onClick={save}>
            Save
          </Button>
        </div>
      </div>
      <div
        className="pt-12"
        style={{
          height: 'calc(100vh - 3rem)',
          overflow: 'auto',
          minWidth: 370,
          marginRight: `${INSPECTOR_DRAWER_WIDTH}px`,
        }}
      >
        <InspectorDrawer />
        {/* <SamplesDrawer /> */}
        {loading ? (
          <div className="flex flex-col space-y-3 items-center mt-4">
            <Skeleton className="h-[125px] w-[600px]" />
            <div className="space-y-2">
              <Skeleton className="h-[125px] w-[600px]" />
              <Skeleton className="h-[125px] w-[600px]" />
            </div>
          </div>
        ) : (
          renderMainPanel()
        )}
      </div>
    </>
  );
}
