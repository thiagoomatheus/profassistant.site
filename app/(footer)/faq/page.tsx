export default function Page() {
    return (
        <>
            <h1>Perguntas Frequentes - {process.env.NEXT_PUBLIC_PROJECT_NAME}</h1>
            <h2>Conta e Cadastro:</h2>

            <ul className={"flex flex-col gap-3"}>
                <li><span className="font-bold">Como criar uma conta?</span> Para criar uma conta, clique <a href="/register">aqui</a>. Preencha o formulário com seu nome, email, telefone e escolha uma senha segura. Você receberá um email de confirmação.</li>
                
                <li><span className="font-bold">Esqueci minha senha. Como recuperá-la?</span> Clique em &quot;Redefina a sua senha aqui&quot; na página de login. Você receberá instruções por e-mail para criar uma nova senha.</li>
                
                <li><span className="font-bold">Posso alterar minhas informações de cadastro?</span> Sim, você pode alterar seu nome e telefone na seção &quot;Minha Conta&quot; após fazer login. Seu email não pode ser alterado, caso precise de uma alteração, entre em contato com nosso suporte.</li>
                
                <li><span className="font-bold">Como cancelar minha assinatura?</span> Para cancelar sua assinatura, acesse a seção &quot;Minha Conta&quot;, vá até a aba de configurações da sua assinatura e siga as instruções.</li>
            </ul>

            <h2>Funcionalidades do SaaS:</h2>

            <ul className={"flex flex-col gap-3"}>
                <li><span className="font-bold">Como gerar uma prova ou atividade?</span> No nosso sistema, você seleciona o tipo de prova ou atividade desejada e utiliza a IA para gerar questões, textos ou expressões matemáticas. Você pode então personalizar e editar o conteúdo gerado para criar o material ideal.</li>
                
                <li><span className="font-bold">Quantos itens posso salvar no banco de dados?</span> A quantidade de itens que você pode salvar (provas, atividades, etc.) depende do seu plano. Confira os detalhes de cada plano em nossa página de preços.</li>
                
                <li><span className="font-bold">Quais tipos de conteúdo a IA pode gerar?</span> Nossa IA pode gerar diversos tipos de conteúdo: questões de múltipla escolha, questões discursivas, textos, frases e expressões matemáticas.</li>
                
                <li><span className="font-bold">Posso exportar ou imprimir minhas provas e atividades?</span> Sim, você pode exportar suas provas em PDF por clicar em imprimir e depois selecionar a opção &quot;Salvar como PDF&quot;. Você também pode imprimir suas provas e atividades.</li>
            </ul>

            <h2>Preços e Pagamentos:</h2>

            <ul className={"flex flex-col gap-3"}>
                <li><span className="font-bold">Quais são os planos disponíveis?</span> Oferecemos planos Free, Pro e Premium. Consulte nossa página de preços para ver os detalhes de cada plano.</li>
                
                <li><span className="font-bold">Como posso fazer o pagamento?</span> Aceitamos pagamentos via <a href="http://www.asaas.com" target="_blank" rel="noopener noreferrer">Asaas</a>.</li>
                
                <li><span className="font-bold">Posso cancelar meu plano?</span> Sim! Você pode cancelar seu plano através da seção &quot;Minha Conta&quot;.</li>
                
                <li><span className="font-bold">Como atualizar meu plano?</span> Você pode atualizar seu plano a qualquer momento na seção &quot;Minha Conta.&quot;.</li>
            </ul>

            <h2>Suporte:</h2>

            <ul className={"flex flex-col gap-3"}>
                <li><span className="font-bold">Como entrar em contato com o suporte?</span> Você pode entrar em contato com nossa equipe de suporte através do email thiagomatheus2001@hotmail.com.</li>
                
                <li><span className="font-bold">Qual o horário de atendimento do suporte?</span> Nosso suporte funciona 24 horas, 7 dias por semana.</li>
            </ul>
        </>
    )
}