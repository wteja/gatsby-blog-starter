---
title: "How to Configure Visual Studio Code’s Formatter Supports JSX?"
author: "Weerayut Teja"
date: "2018-09-12"
path: "/how-to-make-visual-studio-codes-formatter-supports-jsx"
featuredImage: "./featured.png"
---

Are you annoyed with Visual Studio Code’s formatter when working with JSX?

It happened to me earlier. I have the habit to format the code after coding to make the code more readable and beautiful. The VSCode formatter works well on many language, until I worked with JSX in JavaScript file…

It can turned the code like this…

![Original JSX Code](image-1.png)

transformed to this ugly guy…

![Transformed JSX…](image-2.png)

## Simple Solution

Most simple solution is just click on Language Mode on the bottom right of Visual Studio Code and change from **JavaScript** to **JavaScript React** instead.

![Click on JavaScript Language Mode](image-3.png)

![Then choose JavaScript React Instead](image-4.png)

Now you can work without worry that formatter will breaks your JSX.

*But wait … Do I need to do these steps on every *.js file?*

No! Actually, you can tell Visual Studio Code to use **JavaScript React** language mode on every JavaScript file by default.

Configure Visual Studio Code Supports JavaScript React by Default

Go to user settings.
 In Windows and Linux go to menu **File > Preferences > Settings**
 In MacOS go to **Code > Preferences > Settings**

![Go to settings](image-5.png)

Search for files.associations, the files associations setting will be shown as the first result, click on Edit in settings.json

![Edit File Associations](image-6.png)

In the left panel it will be default user settings, which is usually empty, and in the right panel will contains user settings that will overrides the system settings. Your settings should be like example below.

![Original](image-7.png)

Your exists settings might be different, but we just add a new files.associations settings to let all JavaScript files support **“javascriptreact”** language mode by default. So you just adding these property and value:

```javaScript
<script>
let x = 2;
{
     "files.associations": { "**.js": "javascriptreact" },
     …
}
</script>
```

This make our life easier! I hope this guide will be helpful to you guys. Happy coding!