import React from 'react';

// import { useInspectorDrawerOpen, useSamplesDrawerOpen } from '../documents/editor/EditorContext';
// import InspectorDrawer, { INSPECTOR_DRAWER_WIDTH } from './InspectorDrawer';
// import SamplesDrawer, { SAMPLES_DRAWER_WIDTH } from './SamplesDrawer';
import TemplatePanel from './TemplatePanel';

// function useDrawerTransition(cssProperty: 'margin-left' | 'margin-right', open: boolean) {
//   const { transitions } = useTheme();
//   return transitions.create(cssProperty, {
//     easing: !open ? transitions.easing.sharp : transitions.easing.easeOut,
//     duration: !open ? transitions.duration.leavingScreen : transitions.duration.enteringScreen,
//   });
// }

export default function App() {
  // const inspectorDrawerOpen = useInspectorDrawerOpen();
  // const samplesDrawerOpen = useSamplesDrawerOpen();

  // const marginLeftTransition = useDrawerTransition('margin-left', samplesDrawerOpen);
  // const marginRightTransition = useDrawerTransition('margin-right', inspectorDrawerOpen);

  return (
    <>
      <TemplatePanel />
    </>
  );
}
