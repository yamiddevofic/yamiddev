const year = new Date().getFullYear()
const link = [
    {
        tiktok: "/yamiddevofic",
        instagram: "/@yamiddevofic",
        portfolio: "https://yamid.dev"
    }
]
const Footer = [
    {
        title: `© 2022-${year}`,
        label: `<a href='${link[0].portfolio}' target='_blank'>Yamid Dev</a>`,
    },
    {
        title: "Trabajo",
        label: "Freelancer",
    },
    {
        title: "Social",
        label: `<a href='https://tiktok.com${link[0].tiktok}' target='_blank'>Tiktok</a> / <a href='https://instagram.com${link[0].instagram}' target='_blank'>Instagram</a>`,
    },
    {
        title: "Legal",
        label: "Políticas de privacidad",
    }
]

export default Footer;