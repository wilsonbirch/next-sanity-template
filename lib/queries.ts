/**
 * GROQ queries — one named export per page or use case.
 */

const imageProjection = `{
  ...,
  asset->{ _id, metadata { lqip, dimensions } }
}`;

export const siteSettingsQuery = /* groq */ `
  *[_type == "siteSettings"][0]{
    businessName,
    tagline,
    logo${imageProjection},
    navLinks,
    headerCta,
    phone,
    email,
    address,
    social,
    footerText,
    defaultSeo{ ..., ogImage${imageProjection} }
  }
`;

export const homePageQuery = /* groq */ `
  *[_type == "homePage"][0]{
    heroEyebrow,
    heroTitle,
    heroSubtitle,
    heroImage${imageProjection},
    heroCta,
    body[]{
      ...,
      _type == "imageWithAlt" => ${imageProjection}
    },
    seo{ ..., ogImage${imageProjection} }
  }
`;

export const pageBySlugQuery = /* groq */ `
  *[_type == "page" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    heroImage${imageProjection},
    body[]{
      ...,
      _type == "imageWithAlt" => ${imageProjection}
    },
    seo{ ..., ogImage${imageProjection} }
  }
`;

export const allPageSlugsQuery = /* groq */ `*[_type == "page" && defined(slug.current)][].slug.current`;
