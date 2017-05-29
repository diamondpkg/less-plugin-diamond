#! /bin/bash

# Exit on errors
set -e

# Install
printf "\n\nInstalling bootstrap@3.3.7\n"
diamond install npm:bootstrap@3.3.7 --no-save

# Test
printf "\nCompiling..."
output=$(lessc --diamond test/test.less)
if [ $? -eq 0 ]; then
    printf " \033[0;32mOK\033[0m"
else
    printf "\n$output"
fi

printf "\n\n\033[0;32mTests Complete!\033[0m\n"