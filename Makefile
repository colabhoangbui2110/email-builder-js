u:=hoangbui1
h:=10.29.0.19
project_folder:=/home/hoangbui1/deploy/email-ai/email-builder-js

test-heading:
	npx jest packages/block-heading/src/__tests__/index.test.tsx --coverage --verbose

# Sync project to server, excluding files in .gitignore and node_modules
sync-to-server:
	rsync -avhzL -e 'ssh -p 16889' --delete \
	--no-perms --no-owner --no-group \
	--exclude-from=.gitignore \
	--exclude='node_modules' \
	--exclude .git ./ $(u)@$(h):$(project_folder)/
