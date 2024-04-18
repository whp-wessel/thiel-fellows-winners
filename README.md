# Thiel Fellows Winners 🚀

[Thiel Fellows Winners](thiel-fellows-winners.vercel.app) is a website collecting all the grantees of [Thiel Fellowship](https://thielfellowship.org/), initiated by founder and investor [Peter Thiel](https://en.wikipedia.org/wiki/Peter_Thiel).

This repo is based on [Nabeel Qureshi](https://nabeelqu.co/)'s [EV Winners](https://www.evwinners.org/) & [Linus Lee](https://thesephist.com/)'s [YC Vibecheck](https://ycvibecheck.com/).

This site is an independent project and is not an official website of Thiel Fellowship.

![](https://github.com/whp-wessel/thiel-fellows-winners/blob/main/public/thiel-fellows-winners.gif)


## How it works
The site uses semantic similarity (based on embeddings) to power the search function, enabling you to search for people working on broad project areas (e.g. all winners who are doing a startup; machine learning; education; and so on.). The benefit of this is that you don't need to get the exact keywords in order to return relevant results.

The semantic search function is powered by transformers.js and sentence-transformers, using the model all-MiniLM-L6-v2. The front-end is in Next.js 14 and deployed on Vercel.

## Metadata

- **Contribute**: Feel free to submit an issue to the repo if you see any missing data or want any features.
- **Raw data**: You can find the raw data in CSV format [here](https://github.com/whp-wessel/thiel-fellows-winners/blob/main/app/data/Thiel%20Fellowship%20Winners-%20Complete.csv).


## Contact and More Information

For more suggestions & thoughts, please visit the [GitHub repository](#) or dm [Wes](https://twitter.com/whp_wessel).