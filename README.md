# 2S Labs — strona www

Statyczna strona firmowa (HTML + CSS + JS, bez frameworka i bez builda).

## Podgląd lokalny

Otwórz `index.html` w przeglądarce albo uruchom prosty serwer:

```sh
npx serve .
# lub
python -m http.server 8000
```

## Struktura

| Plik | Co zawiera |
|---|---|
| `index.html` | Treść strony (wersja polska — domyślna) |
| `styles.css` | Wygląd, motyw jasny/ciemny, responsywność |
| `script.js` | Tłumaczenia EN, przełącznik motywu i języka, menu mobilne, animacje |
| `assets/` | Favicon i znak logo w SVG |
| `logo-*.jpeg` | Oryginalne pliki logo |

## Edycja treści

- **Polski tekst** — bezpośrednio w `index.html`.
- **Angielski tekst** — w obiekcie `EN` w `script.js` (klucze odpowiadają atrybutom `data-i18n` w HTML).
- Miejsca do uzupełnienia są oznaczone w HTML komentarzem `TODO` (e-mail, dane założycieli, LinkedIn).

## Hosting

Wystarczy dowolny hosting plików statycznych: GitHub Pages, Netlify, Vercel lub Cloudflare Pages — katalog główny repozytorium jest gotową stroną.
