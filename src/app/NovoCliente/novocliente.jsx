import React, { useState, useEffect, useRef } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getFirestore, collection, addDoc, query, where, onSnapshot, getDocs } from 'firebase/firestore';
import '../NovoCliente/novocliente.css'
import { getAuth } from 'firebase/auth';
import { useReactToPrint } from "react-to-print";
import { isEmpty } from 'lodash';
function NovoCliente() {
    const [clientes, setClientes] = useState([]);
    const [loader, setLoader] = useState(false);
    const [formState, setFormState] = useState({
        nome: '',
        email: '',
        fone: '',
        numeroContrato: '',
        razao: '',
        cpf: '',
        fantasia: '',
        endereco: '',
        bairro: '',
        uf: '',
        cidade: '',
        cep: '',
        whats: '',
        obs: '',
        funcionamento: '',
        valor: '',
        plano: '',
        renovNao: '',
        renovSim: '',
        validade: '',
        data: '',
        cargo: '',
        venc2: '',
        representante: ''
    });
    const handleInputChange = (field, value) => {
        setFormState((prevState) => ({ ...prevState, [field]: value }));
    };
    const [plano, setPlano] = useState('');
    const [data, setData] = useState('');
    const [numeroContrato, setNumeroContrato] = useState('');
    const [bairro, setBairro] = useState('');
    const [obs, setObs] = useState('');
    const [funcionamento, setFuncionamento] = useState('');
    const [venc2, setVenc2] = useState('');
    const [valor, setValor] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');
    const [uf, setUf] = useState('');
    const [whats, setWhats] = useState('');
    const [endereco, setEndereco] = useState('');
    const [razao, setRazao] = useState('');
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');
    const [fantasia, setFantasia] = useState('');
    const [email, setEmail] = useState('');
    const [fone, setFone] = useState('');
    const [representante, setRepresentante] = useState('');
    const [renovSim, setRenovSim] = useState(false);
    const [renovNao, setRenovNao] = useState(false);
    const [validade, setValidade] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [cargo, setCargo] = useState('');
    const [sucesso, setSucesso] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            // Use the navigate function to redirect the user
            navigate('/app/home/novocliente');
            return; // Important: Return to avoid executing the rest of the code
        }

        const db = getFirestore();
        const q = query(collection(db, 'clientes'), where('userId', '==', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const clientesData = [];
            snapshot.forEach((doc) => {
                clientesData.push({ id: doc.id, ...doc.data() });
            });
            setClientes(clientesData);
        });

        return () => {
            unsubscribe();
        };
    }, [navigate]);
    const db = getFirestore();
    const clienteJaExiste = async (cpf) => {
        const querySnapshot = await getDocs(query(collection(db, 'clientes'), where('cpf', '==', cpf)));
        return !isEmpty(querySnapshot.docs);
    };
    async function cadastrarCliente() {
        try {
            if (nome.length === 0) {
                setMensagem('Informe o seu nome');
                return;
            } else if (email.length === 0) {
                setMensagem('Informe o email');
                return;
            }
            const clienteData = {
                nome,
                email,
                fone,
                numeroContrato,
                razao,
                cpf,
                fantasia,
                endereco,
                bairro,
                uf,
                cidade,
                cep,
                whats,
                obs,
                funcionamento,
                valor,
                plano,
                renovNao,
                renovSim,
                validade,
                data,
                representante,
                venc2,
                cargo
            };
            const auth = getAuth();
            const userId = auth.currentUser.uid;
            clienteData.userId = userId;
            const clienteExistente = await clienteJaExiste(cpf);
            if (clienteExistente) {
                setMensagem('Cliente já cadastrado.');
                return;
            }
            const novoClienteRef = await addDoc(collection(db, 'clientes'), clienteData);
            setFormState({
                nome: '',
                email: '',
                fone: '',
                numeroContrato: '',
                razao: '',
                cpf: '',
                fantasia: '',
                endereco: '',
                bairro: '',
                uf: '',
                cidade: '',
                cep: '',
                whats: '',
                obs: '',
                funcionamento: '',
                valor: '',
                plano: '',
                renovNao: '',
                renovSim: '',
                validade: '',
                data: '',
                representante: '',
                venc2: '',
                cargo: ''
            });
            setMensagem('');
            setSucesso('S');

            console.log('Novo cliente criado com ID:', novoClienteRef.id);
        } catch (error) {
            console.error('Erro ao cadastrar cliente:', error);
            setMensagem('Ocorreu um erro ao cadastrar o cliente. Por favor, tente novamente.');
            setSucesso('N');
        }
    }
    const contentDocument = useRef();
    const handlePrint = useReactToPrint({
        content: () => contentDocument.current,
    });
    return <div>
        <div className="background">
            <div ref={contentDocument} className="contrato container-fluid titulo-2" id="formId">
                <div className="row">
                    <div className="mb-3 justify-content-center ">
                        <div className="input-group inicio">
                            <div className="logo-maps">
                                <h1 className="novocliente ">AUTORIZAÇÃO PARA ASSESSORIA COM A DIVULGAÇÃO DOS DADOS <br />
                                    COMERCIAIS NA PLATAFORMA DO GOOGLE MAPS</h1>
                                <img src="../../../img/nova-logo.jpg" width="150" alt="" />
                            </div>

                            <div className="import ">
                                <div className="input-group">
                                    <div className="input-group-prendend">
                                        <span className="input-group-text">Contrato Numero</span>
                                    </div>
                                    <input onChange={(e) => setNumeroContrato(e.target.value)} type="text" className="form-control" id="contrato" placeholder="" required />
                                    <div className="input-group-prendend">
                                        <span className="input-group-text">Data de adesão</span>
                                    </div>
                                    <input onChange={(e) => setData(e.target.value)} id="date" type="date" />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <hr className="mb-4" />
                <div className="row formulario">
                    <div className=" order-md-1">
                        <form className="needs-validation" noValidate>
                            <div className="row">
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="primeiroNome ">Razão Social</label>
                                    <input onChange={(e) => setRazao(e.target.value)} type="text" className="form-control" id="priemrioNome" placeholder="Insira a razão social" required />
                                    <div className="invalid-feedback">É obrigatório inserir a razão social</div>
                                </div>
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="primeiroNome">CPF</label>
                                    <input onChange={(e) => setCpf(e.target.value)} type="text" className="form-control" id="priemrioNome" placeholder="Insira o CPF" required />
                                    <div className="invalid-feedback">É obrigatório inserir o CPF!</div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="nomeFantasia">
                                        Nome fantasia
                                    </label>
                                    <input onChange={(e) => setFantasia(e.target.value)} type="nomeFantasia" className="form-control" id="nomeFantasia" placeholder="Insira o nome fantasia" />
                                    <div className="invalid-feedback">
                                        "Por favor insira um nome fantasia."
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="email">
                                        E-mail
                                    </label>
                                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Insira o email" />
                                    <div className="invalid-feedback">
                                        "Por favor insira um email valido."
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="endereco">Endereço</label>
                                    <input onChange={(e) => setEndereco(e.target.value)} type="text" className="form-control" id="endereco" placehoader="Insira o endereço" required />
                                    <div className="invalid-feedback">Por favor, insira seu endereço de entrega</div>
                                </div>
                                <div className="col-md-6 mb-3 font-weight-bold">
                                    <label htmlFor="endereco2">Bairro</label>
                                    <input onChange={(e) => setBairro(e.target.value)} type="text" className="form-control" id="endereco2" placehoader="Insira o bairro" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 mb-3 font-weight-bold">
                                    {/* pais */}
                                    <label htmlFor="estado">UF</label>
                                    <input onChange={(e) => setUf(e.target.value)} type="text" className="form-control" id="estado" placeholder="Insira o UF" required />
                                    <div className="invalid-feedback">Por favor escolha um estado</div>
                                </div>
                                <div className="col-md-4 mb-3 font-weight-bold">
                                    <label htmlFor="cidade">Cidade</label>
                                    <input onChange={(e) => setCidade(e.target.value)} type="text" className="form-control" id="cidade" placeholder="Insira a cidade" required />
                                    <div className="invalid-feedback">Por favor escolha uma cidade</div>
                                </div>
                                <div className="col-md-3 mb-3 font-weight-bold">
                                    <label htmlFor="cep">CEP</label>
                                    <input onChange={(e) => setCep(e.target.value)} type="text" className="form-control" id="cep" placeholder="Insira o cep" required />
                                    <div className="invalid-feedback">É obrigatório inserir um cep</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-5 mb-3 font-weight-bold">
                                    {/* pais */}
                                    <label htmlFor="fone">Telefone:</label>
                                    <div className="input-group">
                                        <div className="input-group-prendend">
                                            <span className="input-group-text">+55</span>
                                        </div>
                                        <input onChange={(e) => setFone(e.target.value)} type="text" className="form-control" id="fone" placeholder="(44) 4444-4444" required />
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3 font-weight-bold">
                                    <label htmlFor="cidade">WhatsApp:</label>
                                    <input onChange={(e) => setWhats(e.target.value)} type="text" className="form-control" id="cep" placeholder="(99) 99999-9999" required />
                                </div>
                            </div>
                            <div className="mb-3 font-weight-bold">
                                <label htmlFor="horario">Horario de funcionamento</label>
                                <input onChange={(e) => setFuncionamento(e.target.value)} type="text" className="form-control" id="horario" placeholder="Insira o horario de funcionamento" required />
                                <div className="invalid-feedback">Por favor escolha um horario</div>
                            </div>
                            <div className="mb-3 font-weight-bold">
                                <label htmlFor="observacao">Observação</label>
                                <input onChange={(e) => setObs(e.target.value)} type="text" className="form-control" id="observacao" placeholder="Campo para observações" required />
                                <div className="invalid-feedback">Por favor escolha uma cidade</div>
                            </div>
                            <hr className="mb-4 font-weight-bold" />
                            <div className="row atualizacao">
                                <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                    <label className="custom-control-label" htmlFor="atualizacao">Atualização</label>
                                    <input type="checkbox" className="custom-control-input" id="atualizacao" />
                                </div>
                                <p className="col-md-1 mb-3 font-weight-bold">-</p>
                                <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                    <label className="custom-control-label" htmlFor="atualizacao">Criação</label>
                                    <input type="checkbox" className="custom-control-input" id="atualizacao" />
                                </div>
                                <p className="col-md-1 mb-3 font-weight-bold">-</p>
                                <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                    <label className="custom-control-label" htmlFor="atualizacao">Anuncio</label>
                                    <input type="checkbox" className="custom-control-input" id="atualizacao" />
                                </div>
                                <p className="col-md-1 mb-3 font-weight-bold">-</p>
                                <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                    <label className="custom-control-label" htmlFor="atualizacao">Cartão Digital</label>
                                    <input type="checkbox" className="custom-control-input" id="atualizacao" />
                                </div>
                                <p className="col-md-1 mb-3 font-weight-bold">-</p>
                                <div className="custom-control custom-checkbox col-md-1.7 mb-3">
                                    <label className="custom-control-label" htmlFor="atualizacao">Logotipo</label>
                                    <input type="checkbox" className="custom-control-input" id="atualizacao" />
                                </div>
                            </div>
                            <hr className="mb-4" />


                            <div className="input-group">
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Plano</span>
                                </div>
                                <select className="custom-select d-block " onChange={(e) => setPlano(e.target.value)} id="estado" required>
                                    <option value="">Escolha</option>
                                    <option>Mensal</option>
                                    <option>Trimestral</option>
                                    <option>Semestral</option>
                                    <option>Anual</option>
                                </select>
                                <div className="invalid-feedback">
                                    Por favor, insira um estado válido.
                                </div>
                                <div className="input-group-prendend">
                                    <span className="input-group-text">R$</span>
                                </div>
                                <input onChange={(e) => setValor(e.target.value)} type="text" className="form-control" id="contrato" placeholder="" required />
                                <div className="input-group-prendend">
                                    <span className="input-group-text">Data de vencimento</span>
                                </div>
                                <input onChange={(e) => setVenc2(e.target.value)} id="date" type="date" />
                            </div>

                            <div className="cond">
                                <p className=" font-weight-bold ">AUTORIZO QUE A EMPRESA G MAPS CONTACT CENTER EIRELI CNPJ:40.407.753/0001-30 REALIZE O PROCESSO DE INCLUSÃO E ATUALIZAÇÃO DOS
                                    MEUS DADOS COMERCIAIS JUNTO A PLATAFORMA DE BUSCA DO GOOGLE MAPS.
                                    TENDO COMO GARANTIA DE INTEGRIDADE E AUTENTICIDADE DESTA AUTORIZAÇÃO PARA ASSESSORIA A GRAVAÇÃO DO ATENDIMENTO
                                    PRESTADO, ESTANDO CIENTE DO VALOR E DATA DE VENCIMENTO CONFORME COMBINADO ENTRE AS PARTES.
                                    APÓS O ACEITE VERBAL A EMPRESA G MAPS CONTACT CENTER EIRELI DARA INICIO AO PROCESSO DE ASSESSORIA A CONTRATANTE.
                                </p>
                                <br /><br /><br />

                                <div className="acessoria ">
                                    <div className="input-group">
                                        <p className="font-weight-bold frase">
                                            Assessoria dos serviços valido por:
                                        </p>
                                        <select className="custom-select d-block " onChange={(e) => setValidade(e.target.value)} id="estado" required>
                                            <option value="">Escolha</option>
                                            <option>1 mês</option>
                                            <option>3 meses</option>
                                            <option>6 meses</option>
                                            <option>1 ano</option>
                                        </select>
                                        <p className="font-weight-bold frase">
                                            a contar da data de adesão.
                                        </p>
                                    </div>
                                </div>

                                <hr className="mb-4" />
                                <div className="row d-flex justify-content-center renovacao" >
                                    <p className="col-md-3 mb-3">
                                        <b>Renovação automatica</b>
                                    </p>
                                    <div className="form-check col-md-1 mb-3">
                                        <input onChange={(e) => setRenovSim(e.target.checked)} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            <b>Sim</b>
                                        </label>
                                    </div>
                                    <div className="form-check mb-3">
                                        <input onChange={(e) => setRenovNao(e.target.checked)} className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                        <label className="form-check-label" htmlFor="flexCheckChecked">
                                            <b>Não</b>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* 
                            <p className="novocliente1 font-weight-bold col-lg-12 cond">AS PARTES ACIMA NOMEADAS ASSINARAM, QUE SE REGERÁ PELAS CLÁUSULAS E CONDIÇÕES.
                            </p> */}
                            <div className="servicos col-lg-12 align-middle">
                                <h4 className="font-weight-bold">
                                    SUA EMPRESA PODERÁ CONTAR COM OS SEGUINTES SERVIÇOS:
                                </h4>
                            </div>
                            <div className="direitos">
                                <p className="font-weight-bold">ATUALIZAÇÃO OU CRIAÇÃO DA PÁGINA GOOGLE <br /><br />
                                    CRIAÇÃO DE CARTÃO DIGITAL INTERATIVO <br /><br />
                                    CRIAÇÃO DE QR CODE DIRECIONADOR <br /><br />
                                    ALTERAÇÃO DE ENDEREÇO E HORÁRIO DE FUNCIONAMENTO <br /><br />
                                    INCLUSÃO DE 30 FOTOS E 5 VIDEOS MENSALMENTE <br /><br />
                                    RESGATE DE DOMINIO GOOGLE MEU NEGÓCIO (Opicional mediante solicitação) <br /><br />
                                    ANIMAÇÃO DE LOGO-TIPO (Opicional mediante solicitação) <br /><br />
                                    INCLUSÃO DE 5 BAIRROS(Opicional mediante solicitação) <br /><br />
                                    VIDEO SLIDE SHOW COM FOTOS(Opicional mediante solicitação) <br /><br />
                                    INCLUSÃO DE LINK DIRECIONADOR PARA WHATSAPP NA PAGINA(Opicional mediante solicitação) <br /><br />
                                    INCLUSÃO DE LINKS DE REDES SOCIAIS(Opicional mediante solicitação) <br /><br />
                                    SEGUIDORES INSTAGRAM(Opicional mediante solicitação) <br /><br />
                                    SUPORTE PARA CRIAÇÃO DE ANUNCIOS COM GESTORES DE TRAFEGO</p>
                            </div>
                            <hr className="mb-4" />
                            <div className="direitos">
                                <p className="font-weight-bold">G MAPS CONTACT CENTER LTDA – CNPJ 40.407.753/0001-30 <br />
                                    E-MAIL: CONTATO@MAPSEMPRESAS.COM.BR <br />
                                    CENTRAL DE ATENDIMENTO <br />
                                    0800 580 2766</p>
                            </div>
                            {/* <ul className="row icones">
                                <li><a href="https://www.facebook.com/grupomapsempresas"><i className="fab fa-facebook-f fa"></i></a></li>
                                <li><a href="https://api.whatsapp.com/send?phone=551139392301&text=Ol%C3%A1,%20gostaria%20de%20maiores%20informa%C3%A7%C3%B5es%20sobre%20o%20Google%20Meus%20Neg%C3%B3cios,%20podem%20me%20ajudar?"><i className=" fab fa-whatsapp fa"></i></a></li>
                                <li><a href="https://www.instagram.com/grupomaps/"><i className="fab fa-instagram fa"></i></a></li>
                                <li><a href="https://www.tiktok.com/@grupomaps?_t=8iXuXTextzR&_r=1"><i className="fab fa-tiktok fa"></i></a></li>
                                <li><a href="https://www.youtube.com/watch?si=9p3Z6n29-Qb7xBEN&v=TdAkLQayZC8&feature=youtu.be"><i className="fab fa-youtube fa"></i></a></li>
                            </ul> */}

                            <div className="termo">
                                <p className="font-weight-bold">
                                <i>Verifique os termos de uso clicando no Link Abaixo;</i> 
                                </p> 
                                <a href="https://drive.google.com/file/d/1w-qyjwVCiyNw48umtcqfQHWhMHxysjJA/view" target="_blank" rel="noopener noreferrer">TERMOS DE USO</a>
                                </div>
                            <div className="servicos2 col-lg-12 align-middle">
                                <h4 className="font-weight-bold">
                                    LEI GERAL DE PROTEÇÃO DE DADOS LEI 13.709/2018                                </h4>
                            </div>
                            <div className="termos">
                                <p className="termos-uso">
                                    1. Do direito à privacidade
                                    A Lei 13709/2018 - Lei Geral de Proteção de Dados (LGPD) estabelece como fundamento o respeito à privacidade. Desse modo, o
                                    presente Termo de Privacidade tem o propósito de comunicar de forma simples quais tipos de dados pessoais serão coletados,
                                    quando, de que forma e para quais finalidades serão utilizados.
                                    A privacidade é um direito conferido a todo indivíduo, está protegida pela lei brasileira e consiste na habilidade que este t em de
                                    controlar a exposição de informações sobre sua vida pessoal, sua intimidade, bem como a disponibilidade de dados sobre si mesmo,
                                    de retificar, ratificar ou apagar estes e de proteger a confidencialidade de suas comunicações, seu domicílio, sua imagem, honra e
                                    reputação perante terceiros.
                                    2. Atualização e veracidade dos dados; O titular e/ou seus responsáveis legais são os responsáveis pela atualização, exatidão e
                                    veracidade dos dados que informarem à empresa Grupo Maps. Caso sejam identificados erros de informações cadastradas, o G
                                    Maps Contact Center Eireli solicitará ao Titular correções;
                                    O G Maps Contact Center Eireli não se responsabiliza por dados desatualizados em suas bases de dados.
                                    3. Do prazo e forma de armazenamento; Os dados do usuário serão obtidos por meio da efetivação de seu vínculo com a Instituição,
                                    quando o usuário insere as informações voluntariamente, por meio de ferramentas de coleta de dados de acesso e navegação
                                    existentes em alguns sites e/ou aplicativos.
                                    Os dados coletados são armazenados em ambiente seguro e em servidor próprio ou de terceiro contratado para este fim.
                                    4. Da Segurança e Proteção dos Dados Pessoais
                                    As informações são protegidas com padrões de segurança e confidencialidade, para fornecer aos usuários um ambiente seguro e
                                    confiável através do uso de criptografia, certificações digitais e acessos controlados.
                                    Adicionalmente, o próprio titular deve exercer alguns cuidados para auxiliar na proteção de seus dados.
                                    a) Cuidados com Golpes: Os criminosos cibernéticos se aproveitam dos assuntos do momento para enviar mensagens
                                    fraudulentas com intuito de roubar dados ou instalar vírus e outros softwares maliciosos por meio de links em mensagens falsas.
                                    b) Compartilhamento de senhas: Sua senha é pessoal e intransferível e que deve ser mantida sob sigilo e em ambiente seguro.
                                    Não compartilhe a sua senha, ceder ou utilizar a senha de outra pessoa é tipificado como crime no art. 308, do Código Penal.
                                    </p>
                            </div>
                            <hr className="mb-4" />
                            <div className="col-md-6 mb-3 font-weight-bold">
                                <label htmlFor="nome">Autorizado por:</label>
                                <div className="input-group">
                                    <div className="input-group-prendend">
                                        <span className="input-group-text">Nome:</span>
                                    </div>
                                    <input onChange={(e) => setNome(e.target.value)} type="text" className="form-control" id="nome" placeholder="Proprietario" required />
                                    <div className="invalid-feedback feedback" >O nome é obrigatório</div>
                                </div>
                            </div>
                            <div className="col-md-6 mb-3 font-weight-bold">
                                <div className="input-group">
                                    <div className="input-group-prendend">
                                        <span className="input-group-text">Cargo:</span>
                                    </div>
                                    <input onChange={(e) => setCargo(e.target.value)} type="text" className="form-control" id="nome" placeholder="Cargo" required />
                                    <div className="invalid-feedback feedback" >O nome é obrigatório</div>
                                </div>
                            </div>
                            {/* <div className="row ass">
                                <div className="autorizante">
                                    <p className=" mb-3 font-weight-bold">informacoes do autorizante</p>
                                </div> */}
                                {/* <div className="info-exta">
                                    <p className="mb-3 font-weight-bold text-right">A contratante realizou a assinatura do <br /> presente contrato de forma Digital, <br /> declarando assim ter poderes para assinar. <br /> Estando ciente do 1º vencimento para: <br /></p >

                                    <div className="ass2">
                                        <p className="font-weight-bold">Assinatura do contratante:</p>
                                    </div>
                                </div> */}
                                {/* <div className="logo-maps2">
                                    <img src="../../../img/nova-logo.jpg" width="150" alt="" />
                                </div>
                            </div>
                            <br /><br /><br />
                            <hr className="mb-4" />
                            <br />
                            <br />
                            <br /> */}
                            {/* <hr className="mb-4"/>
                            <div className="assinatura-maps row">
                            <p className="font-weight-bold">         
                            ASSINATURA DA CONTRATADA:
                            </p>
                            <div className="ass-maps">
                            <img src="../../../img/ass.png" alt="" />
                            </div>
                            </div> */}
                            {mensagem.length > 0 ? <div className="alert alert-danger mt-2" role="alert">{mensagem}</div> : null}
                            {sucesso === 'S' ? <Navigate to='/app/home' /> : null}
                        </form>
                    </div>
                </div>
            </div>
            <div className="row salvar">
                <Link to="/app/home" className="btn btn-warning btn-acao">Cancelar</Link>
                <button onClick={cadastrarCliente} type="button" className="btn btn-primary btn-acao">Salvar</button>
                <button className="btn btn-danger btn-cli" onClick={handlePrint} disabled={loader}>
                    {loader ? <span>Baixando</span> : <span>Baixar PDF</span>}<i className="fa-solid fa-file-pdf"></i>
                </button>
            </div>
        </div >
    </div>
}
export default NovoCliente;