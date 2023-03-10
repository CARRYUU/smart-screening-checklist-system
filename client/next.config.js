/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["carryuu.student.ncu.edu.tw"],
  },
  async redirects() {
    return [
      {
        source: "/github",
        destination:
          "https://github.com/CARRYUU/smart-screening-checklist-system",
        permanent: false,
      },
      {
        source: "/deploy",
        destination: "https://carryuu.student.ncu.edu.tw/",
        permanent: false,
      },
    ];
  },
};
