build:
	rm -rf node_modules && npm link @usewaypoint/block-text@0.0.6 @usewaypoint/block-heading@0.0.6 @usewaypoint/document-core@0.0.6 && npx tsup src/index.ts --format cjs,esm --dts && npm unlink --global @usewaypoint/email-builder && npm link 
