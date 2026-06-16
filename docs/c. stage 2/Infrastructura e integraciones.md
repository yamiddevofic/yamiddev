
# Infrastructura

| Componente               | Decisión                                                                 | Justificación                                                                 |
| ------------------------ | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| **Hosting**              | Cloudflare Pages                                                         | Mejor rendimiento y latencia en Latam, gratis, despliega directo desde GitHub |
| **Dominio**              | yamid.dev — migrar nameservers de Vercel a Cloudflare                    | Centralizar todo en Cloudflare, mejor performance global                      |
| **Control de versiones** | Git + GitHub, repositorio público                                        | Prueba de código real para contactos técnicos que lleguen al portafolio       |
| **CI/CD**                | Cloudflare Pages automático — cada push a `main` despliega               | Sin configuración extra, viene incluido con Cloudflare Pages                  |
| **Assets estáticos**     | `/public/images` en el repositorio, servidos vía CDN de Cloudflare Pages | Sin servicio externo adicional — Cloudflare lo maneja automáticamente         |
# Integraciones
| Servicio                   | Decisión                 | Justificación                                                           |
| -------------------------- | ------------------------ | ----------------------------------------------------------------------- |
| **Formulario de contacto** | Web3Forms                | Gratis, sin backend propio, compatible con Astro estático               |
| **Analíticas**             | Cloudflare Web Analytics | Gratis, incluido en Cloudflare, sin cookies, sin impacto en rendimiento |
## Plan personal Web3Form
### Free Forever
- Unlimited Forms
- 250 Monthly Submissions
- Unlimited Domains
- Advanced Spam Protection
- hCaptcha Integration
- Custom Redirect Page
- All Basic Features
