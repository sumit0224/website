export default function sitemap() {
    const baseUrl = 'https://dm3school.com';

    // Static routes
    const routes = [
        '',
        '/about',
        '/courses',
        '/blogs',
        '/contact',
        '/placement',
        '/enroll',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
