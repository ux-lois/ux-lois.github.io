# Website ux-lois.github.io

## development manual

This site is using [Jekyll](https://jekyllrb.com/).

### Local development on windows

Prerequisites :

- Node >=18
- Ruby 3.2.2 with devkit
- MSYS2 (included in Ruby)
- gem install bundler jekyll
- gem install jekyll-sitemap

```
C:\Windows\system32>where jekyll
C:\Ruby32-x64\bin\jekyll
C:\Ruby32-x64\bin\jekyll.bat
```

```
git clone https://github.com/ux-lois/ux-lois.github.io ux-lois
cd ux-lois
npm install
npm run watch
```

Run in another terminal

```
cd ux-lois
npm run jekyll
```

Open http://127.0.0.1:4000/

### Adding a new card

## Todo

- add cards
- update a ugly theme to showcast aesthetic
- refactoriser le systeme de SVG
