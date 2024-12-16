export default function Page() {
    return (
        <>
            <h1>Politica de Privacidade</h1>
            <h2>Introdução:</h2>
            <p>Esta Política de Privacidade descreve como o <strong>{process.env.NEXT_PUBLIC_PROJECT_NAME}</strong> coleta, usa, compartilha e protege suas informações pessoais quando você utiliza o nosso serviço. Valorizamos sua privacidade e estamos comprometidos em proteger seus dados.</p>
            <h2>Dados Coletados:</h2>
            <h3>Informações de Cadastro:</h3>
            <ul className={"flex flex-col gap-3"}>
                <li><span className={"font-bold"}>Nome completo:</span> utilizado para identificação e personalização da experiência do usuário.</li>
                <li><span className={"font-bold"}>E-mail:</span> usado para comunicação, autenticação e recuperação de senha.</li>
                <li><span className={"font-bold"}>Telefone:</span> utilizado para contato, caso necessário, e para verificação da conta, se aplicável.</li>
                <li><span className={"font-bold"}>Senha:</span> armazenada de forma segura e criptografada para proteger sua conta.</li>
            </ul>
            <h3>Dados de Uso:</h3>
            <ul className={"flex flex-col gap-3"}>
                <li><span className={"font-bold"}>Quantidade de dados salvos no banco de dados:</span> utilizada para controle da assinatura do cliente e para garantir o uso adequado dos recursos do SaaS.</li>
                <li><span className={"font-bold"}>Quantidade de requisições de IA:</span> utilizada para controle da assinatura do cliente e para garantir o uso adequado dos recursos de IA.</li>
            </ul>
            <h3>Dados Opcionais:</h3>
            <ul className={"flex flex-col gap-3"}>
                <li><span className={"font-bold"}>Tema e nome da instituição de ensino:</span> usados para personalizar a experiência do usuário e melhorar a relevância das informações geradas pela IA.</li>
            </ul>
            <h3>Dados de Pagamento:</h3>
            <p>O <strong>{process.env.NEXT_PUBLIC_PROJECT_NAME}</strong> não coleta ou armazena dados de cartão de crédito ou outras informações financeiras. Os pagamentos são processados por meio da plataforma <a href="https://www.asaas.com" target="_blank">Asaas</a>, que é responsável por coletar e proteger esses dados.</p>
            <p>Os seguintes dados relacionados ao pagamento são armazenados em nosso banco de dados para controle da assinatura:</p>
            <ul className={"flex flex-col gap-3"}>
                <li>Customer_ID da plataforma de pagamentos.</li>
                <li>ID do PaymentLink gerado pela plataforma.</li>
                <li>ID da assinatura.</li>
            </ul>
            <h2>Uso dos Dados:</h2>
            <ul className={"flex flex-col gap-3"}>
                <li><span className={"font-bold"}>Nome, email, telefone e senha:</span> utilizados para o cadastro do usuário, autenticação, recuperação de senha, comunicação e personalização da experiência do usuário.</li>
                <li><span className={"font-bold"}>Tema e instituição de ensino:</span> usados para melhorar o desempenho do usuário durante o uso do sistema e para personalizar a experiência do usuário, como sugerir recursos específicos para a sua área de atuação.</li>
                <li><span className={"font-bold"}>Quantidade de dados salvos ou requisições feitas:</span> utilizados para controlar a assinatura do cliente e para garantir que o usuário esteja utilizando os recursos de acordo com o seu plano.</li>
                <li><span className={"font-bold"}>Dados de pagamento:</span> utilizados para controle da assinatura do cliente.</li>
            </ul>
            <h2>Compartilhamento de Dados:</h2>
            <ul className={"flex flex-col gap-3"}>
                <li><span className={"font-bold"}>Dados de IA:</span> Utilizamos o <a href="https://gemini.google.com/?hl=pt-BR"target="_blank">Gemini</a> para gerar textos, questões e expressões matemáticas. O <a href="https://gemini.google.com/?hl=pt-BR"target="_blank">Gemini</a> pode coletar dados para treinamento de sua IA.</li>
                <li><span className={"font-bold"}>Parceiros de pagamento:</span> Compartilhamos informações de pagamento, como o Customer_ID, ID do PaymentLink e ID da assinatura com a plataforma de pagamentos <a href="https://www.asaas.com" target="_blank">Asaas</a> para fins de processamento de pagamentos e controle da assinatura.</li>
                <li><span className={"font-bold"}>Autoridades legais:</span> Podemos compartilhar suas informações pessoais com autoridades legais, caso haja uma solicitação legal ou se necessário para cumprir com as leis.</li>
            </ul>
            <h2>Segurança dos Dados:</h2>
            <ul className={"flex flex-col gap-3"}>
                <li><span className={"font-bold"}>Pagamentos:</span> Todas as transações de pagamento são processadas pela [Nome da plataforma de pagamento], que é referência em segurança e possui mecanismos robustos de proteção de dados.</li>
                <li><span className={"font-bold"}>SSL:</span> Nosso site possui certificado SSL, o que criptografa a comunicação entre seu navegador e nosso servidor, garantindo a segurança das informações transmitidas.</li>
                <li><span className={"font-bold"}>Banco de Dados:</span> Nosso banco de dados utiliza mecanismos de controle de acesso com base em regras definidas (RLS), garantindo que apenas usuários autenticados com permissões específicas possam visualizar e modificar seus dados.</li>
                <li><span className={"font-bold"}>Proteção contra Ataques:</span> Nosso servidor possui medidas de proteção contra ataques DDoS, para garantir a segurança da plataforma.</li>
            </ul>
            <h2>Direitos do Usuário:</h2>
            <ul className={"flex flex-col gap-3"}>
                <li><span className={"font-bold"}>Acesso aos dados:</span> Você pode acessar e visualizar seus dados de cadastro (nome, e-mail, telefone) na seção &quot;Minha Conta&quot; após fazer login no sistema.</li>
                <li><span className={"font-bold"}>Alteração dos dados:</span> Você pode alterar ou atualizar seus dados de cadastro (nome, telefone), exceto o email.</li>
                <li><span className={"font-bold"}>Exclusão dos dados:</span> Você pode solicitar a exclusão de seus dados de cadastro.</li>
                <li><span className={"font-bold"}>Exclusão de conteúdo:</span> Você pode excluir os dados que você mesmo salvou no sistema, como questões, atividades e outros conteúdos.</li>
            </ul>
            <h2>Cookies:</h2>
            <p>Utilizamos cookies para autenticação (access_token) e para salvar o tema do usuário. Os cookies são pequenos arquivos de texto que são armazenados no seu navegador e que permitem que você tenha uma experiência mais personalizada ao utilizar o nosso serviço. Você pode configurar as preferências do seu navegador para recusar cookies, mas isso pode afetar a sua experiência no nosso site.</p>
            <h2>Modificações da Política de Privacidade:</h2>
            <p>Podemos atualizar esta Política de Privacidade de tempos em tempos. Publicaremos qualquer alteração nesta página e, se as alterações forem significativas, notificaremos você por email ou por meio de um aviso visível no nosso site.</p>
            <h2>Contatos:</h2>
            <p>Se tiver alguma dúvida sobre esta Política de Privacidade, entre em contato conosco através do seguinte endereço de e-mail: thiagomatheus2001@hotmail.com.</p>
            <p>Última atualização: 17/11/2024.</p>
        </>
    )
}