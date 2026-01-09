# Templates de Email para UERGS Check

Estes templates HTML devem ser configurados no painel do Supabase para personalizar os emails enviados pelo sistema.

## Como configurar no Supabase:

1. Acesse o painel do Supabase: https://supabase.com/dashboard
2. Selecione seu projeto "Uergs Check app"
3. Vá em **Authentication** → **Email Templates**
4. Copie o conteúdo dos arquivos HTML para os respectivos templates:
   - `confirmation-email.html` → **Confirm signup**
   - `reset-password-email.html` → **Reset password**

## Templates disponíveis:

### 1. confirmation-email.html
Email de confirmação de cadastro com:
- Logo oficial da UERGS
- Cores institucionais (verde, vermelho, amarelo)
- Design profissional e responsivo
- Botão de confirmação destacado
- Lista de funcionalidades do sistema

### 2. reset-password-email.html
Email de redefinição de senha com:
- Design consistente com o email de confirmação
- Botão de ação em vermelho (atenção)
- Alerta de segurança destacado
- Informações sobre expiração do link

## Variáveis disponíveis:

O Supabase substitui automaticamente estas variáveis:
- `{{ .ConfirmationURL }}` - Link de confirmação/redefinição
- `{{ .Token }}` - Token de verificação
- `{{ .TokenHash }}` - Hash do token
- `{{ .SiteURL }}` - URL do site

## Cores oficiais da UERGS:

- Verde principal: `#1b5e20` e `#2e7d32`
- Vermelho: `#c62828`
- Amarelo: `#f9a825`

## Testando os templates:

Após configurar os templates no Supabase, teste:
1. Criando uma nova conta
2. Solicitando redefinição de senha
3. Verifique se os emails chegam formatados corretamente
