build:
	rm -rf node_modules && npm link @usewaypoint/email-builder@0.0.8 && npx tsup src/index.tsx --format cjs,esm --dts && npm unlink --global @usewaypoint/block-heading && npm link
