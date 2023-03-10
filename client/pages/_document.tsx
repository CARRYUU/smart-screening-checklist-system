import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    let description = "A General-Purpose Smart Screening Checklist System Text Mining of The Eletronic Medical System";
    let ogimage = "../public/carryu_small_logo_white_background.png";
    let sitename = "carryuu.student.ncu.edu.tw";
    let title = "Smart Screening Checklist System";

    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/carryu_small_logo.ico" />
          <meta name="description" content={description} />
          <meta property="og:site_name" content={sitename} />
          <meta property="og:description" content={description} />
          <meta property="og:title" content={title} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta property="og:image" content={ogimage} />
          <meta name="twitter:image" content={ogimage} />
        </Head>
        <body className="bg-[#17181C] text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
