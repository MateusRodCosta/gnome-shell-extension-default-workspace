#!/bin/bash

# Script to build the extension zip and install the package
#
# This Script is released under GPL v3 license
# Copyright (C) 2020-2026 Javad Rahmatzadeh

set -e

# cd to the repo root
cd "$( cd "$( dirname "$0" )" && pwd )/.."

#echo "Compiling Resources..."
#glib-compile-resources \
#    --sourcedir src/data \
#    src/data/resources.gresource.xml

echo "Packing extension..."
gnome-extensions pack src \
    --force \
    --podir="../po" \
    --extra-source="data/resources.gresource" \
    --extra-source="lib" \
    --extra-source="../LICENSE" \
    --extra-source="../CHANGELOG.md"

echo "Packing Done!"

while getopts i flag; do
    case $flag in

        i)  gnome-extensions install --force \
            default-workspace@mateusrodcosta.com.shell-extension.zip && \
            echo "Extension is installed. Now restart the GNOME Shell." || \
            { echo "ERROR: Could not install the extension!"; exit 1; };;

        *)  echo "ERROR: Invalid flag!"
            echo "Use '-i' to install the extension to your system."
            echo "To just build it, run the script without any flag."
            exit 1;;
    esac
done

