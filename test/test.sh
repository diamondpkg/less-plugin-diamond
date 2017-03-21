#! /bin/bash

# Exit on errors
set -e

# Check dependencies
printf "Checking dependencies\n"
depcheck --ignores=eslint,eslint-config-airbnb,eslint-plugin-import,eslint-plugin-jsx-a11y,eslint-plugin-react,diamondpkg

# Install
printf "\n\nInstalling bootstrap@3.3.7\n"
diamond install bootstrap@3.3.7 --no-save

# Test
printf "\nCompiling..."
output=$(lessc --diamond test/test.less)
if [ $? -eq 0 ]; then
    printf " \033[0;32mOK\033[0m"
else
    printf "\n$output"
fi

printf "\n\n\033[0;32mTests Complete!\033[0m\n"