# Electron & UWP Background Task

This repository contains sample code showing how to use background tasks from Electron apps. A background task can be used to interact with the user's operating system when the application is not running - for instance to display toast notifications or to update live tiles.

Two components are required:

 * Electron app
 * Background task that can be invoked by Windows

The background task needs to be registered at runtime, usually during the first launch of your application. For the sake of simplicity, this example uses a little invisible .NET console app invoked by the Electron app at launch, but you're at liberty to perform the registration of the background task with any means you see fit.

## Prerequisites
 * Windows 10 Anniversary Update (build 14342 and up)
 * To build from source, Windows 10 SDK (build 14332.1000 - download it from the [developer section on Windows Insider](https://insider.windows.com/))

## Running the Example
 * Download the example and unzip it.
 * Open up PowerShell as an administrator and execute `Add-AppxPackage –register ./electron-uwp-background/AppxManifest.xml`
 * In your start menu, search for "Electron Background". Make a right click and pin it to your start menu. Run the app.
 * In your settings, change your time zone. A notification should pop up, and the tile of your app should update.
 
 > :warning: Do *not* be shocked if the notification or the new live do not show up immediately. They should be visible within the first two minutes, but dependening on your system and its load, it might take longer.
 
## Building from Source

 * Run `npm install` to install all Node dependencies
 * Use Visual Studio to open and build the background task (`background-task/BackgroundTask.csproj`)
 * Use Visual Studio to open and build the background task registerer (`background-task-registerer/BackgroundTaskRegisterer.csproj`)
 * Run `npm run build` to build a folder with the contents of the AppX package
 * You can "install" the folder by running `Add-AppxPackage –register ./output/AppxManifest.xml`

## License
MIT; Copyright (c) 2016 Microsoft Corporation & Felix Rieseberg. See LICENSE.md for details.