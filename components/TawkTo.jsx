"use client";
import Script from "next/script";

export default function TawkTo() {
  return (
    <Script
      id="tawk-to"
      strategy="afterInteractive" // client-side load
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/667d9864eaf3bd8d4d150ed3/1i1d9mign';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `,
      }}
    />
  );
}
