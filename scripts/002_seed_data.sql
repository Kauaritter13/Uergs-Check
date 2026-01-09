-- Insert Engenharia da Computação course
INSERT INTO courses (id, name) 
VALUES ('123e4567-e89b-12d3-a456-426614174000', 'Engenharia da Computação')
ON CONFLICT (name) DO NOTHING;

-- Insert all subjects for Engenharia da Computação
-- 1º Semestre
INSERT INTO subjects (course_id, name, credits, hours, semester, prerequisites, is_elective) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Epistemologia', 2, 30, 1, 'Sem pré-requisitos', false),
('123e4567-e89b-12d3-a456-426614174000', 'Álgebra Linear e Geometria Analítica', 4, 60, 1, 'Sem pré-requisitos', false),
('123e4567-e89b-12d3-a456-426614174000', 'Algoritmos e Programação I', 4, 60, 1, 'Sem pré-requisitos', false),
('123e4567-e89b-12d3-a456-426614174000', 'Lógica para Computação', 4, 60, 1, 'Sem pré-requisitos', false),
('123e4567-e89b-12d3-a456-426614174000', 'Arquitetura de Computadores I', 4, 60, 1, 'Sem pré-requisitos', false),
('123e4567-e89b-12d3-a456-426614174000', 'Introdução à Engenharia de Computação', 2, 30, 1, 'Sem pré-requisitos', false),
('123e4567-e89b-12d3-a456-426614174000', 'Matemática para Engenharia', 4, 60, 1, 'Sem pré-requisitos', false);

-- 2º Semestre
INSERT INTO subjects (course_id, name, credits, hours, semester, prerequisites, is_elective) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Física I', 4, 60, 2, 'Álgebra Linear e Geometria Analítica; Matemática para Engenharia', false),
('123e4567-e89b-12d3-a456-426614174000', 'Cálculo I', 4, 60, 2, 'Matemática para Engenharia', false),
('123e4567-e89b-12d3-a456-426614174000', 'Laboratório de Física I', 2, 30, 2, 'Co-Requisito: Física I', false),
('123e4567-e89b-12d3-a456-426614174000', 'Técnicas Digitais', 4, 60, 2, 'Arquitetura de Computadores I', false),
('123e4567-e89b-12d3-a456-426614174000', 'Arquitetura de Computadores II', 4, 60, 2, 'Arquitetura de Computadores I', false),
('123e4567-e89b-12d3-a456-426614174000', 'Legislação e Ética', 2, 30, 2, 'Sem pré-requisitos', false),
('123e4567-e89b-12d3-a456-426614174000', 'Tecnologia, Ambiente e Sociedade', 2, 30, 2, 'Sem pré-requisitos', false),
('123e4567-e89b-12d3-a456-426614174000', 'Algoritmos e Programação II', 4, 60, 2, 'Algoritmos e Programação I', false);

-- 3º Semestre
INSERT INTO subjects (course_id, name, credits, hours, semester, prerequisites, is_elective) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Física II', 4, 60, 3, 'Cálculo I; Física I; Laboratório de Física I; Co-Requisito: Cálculo 2', false),
('123e4567-e89b-12d3-a456-426614174000', 'Laboratório de Física II', 2, 30, 3, 'Co-Requisito: Física II', false),
('123e4567-e89b-12d3-a456-426614174000', 'Metodologia Científica', 2, 30, 3, 'Sem pré-requisitos', false),
('123e4567-e89b-12d3-a456-426614174000', 'Cálculo II', 4, 60, 3, 'Cálculo I, Álgebra Linear e Geometria Analítica', false),
('123e4567-e89b-12d3-a456-426614174000', 'Sistemas Digitais', 4, 60, 3, 'Técnicas Digitais; Arquitetura de Computadores II', false),
('123e4567-e89b-12d3-a456-426614174000', 'Circuitos Elétricos I', 4, 60, 3, 'Cálculo I, Álgebra Linear e Geometria Analítica', false),
('123e4567-e89b-12d3-a456-426614174000', 'Estrutura de Dados', 4, 60, 3, 'Algoritmos e Programação II', false);

-- 4º Semestre
INSERT INTO subjects (course_id, name, credits, hours, semester, prerequisites, is_elective) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Física III', 4, 60, 4, 'Física I; Laboratório de Física I; Cálculo II', false),
('123e4567-e89b-12d3-a456-426614174000', 'Laboratório de Física III', 2, 30, 4, 'Co-Requisito: Física III', false),
('123e4567-e89b-12d3-a456-426614174000', 'Circuitos Elétricos II', 4, 60, 4, 'Circuitos Elétricos I, Física II; Co-requisito: Cálculo III', false),
('123e4567-e89b-12d3-a456-426614174000', 'Cálculo III', 4, 60, 4, 'Cálculo II', false),
('123e4567-e89b-12d3-a456-426614174000', 'Programação de Sistemas', 4, 60, 4, 'Estruturas de Dados', false),
('123e4567-e89b-12d3-a456-426614174000', 'Engenharia de Software', 4, 60, 4, 'Algoritmos e Programação II', false),
('123e4567-e89b-12d3-a456-426614174000', 'Organização de Computadores', 4, 60, 4, 'Sistemas Digitais', false),
('123e4567-e89b-12d3-a456-426614174000', 'Cálculo Vetorial', 4, 60, 4, 'Cálculo II', false);

-- 5º Semestre
INSERT INTO subjects (course_id, name, credits, hours, semester, prerequisites, is_elective) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Física IV', 4, 60, 5, 'Física II; Física III; Laboratório de Física II, Laboratório de Física III', false),
('123e4567-e89b-12d3-a456-426614174000', 'Cálculo IV', 4, 60, 5, 'Cálculo III', false),
('123e4567-e89b-12d3-a456-426614174000', 'Eletrônica I', 6, 90, 5, 'Circuitos Elétricos II', false),
('123e4567-e89b-12d3-a456-426614174000', 'Laboratório de Sistemas Operacionais', 2, 30, 5, 'Co-requisito: Sistemas Operacionais', false),
('123e4567-e89b-12d3-a456-426614174000', 'Sistemas Operacionais', 4, 60, 5, 'Arquitetura de Computadores II; Estrutura de dados', false),
('123e4567-e89b-12d3-a456-426614174000', 'Qualidade e Testes de Sistemas de Software', 2, 30, 5, 'Engenharia de Software', false),
('123e4567-e89b-12d3-a456-426614174000', 'Probabilidade e Estatística', 2, 30, 5, 'Cálculo II', false),
('123e4567-e89b-12d3-a456-426614174000', 'Métodos Numéricos', 4, 60, 5, 'Cálculo III; Algoritmos e Programação I', false);

-- 6º Semestre
INSERT INTO subjects (course_id, name, credits, hours, semester, prerequisites, is_elective) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Sistemas e Modelagem', 4, 60, 6, 'Cálculo IV; Circuitos Elétricos II', false),
('123e4567-e89b-12d3-a456-426614174000', 'Eletrônica II', 6, 90, 6, 'Eletrônica I', false),
('123e4567-e89b-12d3-a456-426614174000', 'Microcontroladores', 4, 60, 6, 'Organização de Computadores; Eletrônica I', false),
('123e4567-e89b-12d3-a456-426614174000', 'Laboratório de Microcontroladores', 2, 30, 6, 'Co-requisito: Microcontroladores', false),
('123e4567-e89b-12d3-a456-426614174000', 'Redes de Computadores', 4, 60, 6, 'Sistemas Operacionais; Laboratório de Sistemas Operacionais', false),
('123e4567-e89b-12d3-a456-426614174000', 'Sistemas de Tempo Real', 4, 60, 6, 'Sistemas Operacionais; Laboratório de Sistemas Operacionais', false);

-- 7º Semestre
INSERT INTO subjects (course_id, name, credits, hours, semester, prerequisites, is_elective) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Instrumentação Eletrônica', 4, 60, 7, 'Sistemas e Modelagem, Probabilidade e Estatística; Eletrônica II', false),
('123e4567-e89b-12d3-a456-426614174000', 'Barramentos e programação E/S', 4, 60, 7, 'Sistemas Operacionais; Lab. De Sistemas Operacionais, Microcontroladores', false),
('123e4567-e89b-12d3-a456-426614174000', 'Sistemas Distribuídos', 4, 60, 7, 'Sistemas Operacionais; Laboratório de Sistemas Operacionais', false),
('123e4567-e89b-12d3-a456-426614174000', 'Fundamentos de Circuitos Integrados', 4, 60, 7, 'Eletrônica I', false),
('123e4567-e89b-12d3-a456-426614174000', 'Comunicação de Dados', 4, 60, 7, 'Redes de Computadores', false);

-- 8º Semestre
INSERT INTO subjects (course_id, name, credits, hours, semester, prerequisites, is_elective) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Sistemas de Controle', 4, 60, 8, 'Instrumentação Eletrônica', false),
('123e4567-e89b-12d3-a456-426614174000', 'Projeto de Sistemas Integrados I', 4, 60, 8, 'Fundamentos de Circuitos Integrados', false),
('123e4567-e89b-12d3-a456-426614174000', 'Processamento Digital de Sinais', 4, 60, 8, 'Cálculo IV', false),
('123e4567-e89b-12d3-a456-426614174000', 'Laboratório de Sistemas Integrados I', 2, 30, 8, 'Co-Requisito: Projeto de Sistemas Integrados I', false);

-- 9º Semestre
INSERT INTO subjects (course_id, name, credits, hours, semester, prerequisites, is_elective) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Trabalho de Conclusão de Curso I', 2, 30, 9, 'Ter 200 créditos ou mais', false),
('123e4567-e89b-12d3-a456-426614174000', 'Testes de Sistemas de Hardware', 2, 30, 9, 'Projetos de Sistemas Integrados I', false),
('123e4567-e89b-12d3-a456-426614174000', 'Automação', 4, 60, 9, 'Instrumentação Eletrônica', false),
('123e4567-e89b-12d3-a456-426614174000', 'Gestão e Empreendedorismo', 4, 60, 9, 'Engenharia de Software', false);

-- 10º Semestre
INSERT INTO subjects (course_id, name, credits, hours, semester, prerequisites, is_elective) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Trabalho de Conclusão de Curso II', 2, 30, 10, 'Trabalho de Conclusão do Curso I', false),
('123e4567-e89b-12d3-a456-426614174000', 'Estágio Profissional Supervisionado', 12, 180, 10, 'Ter 200 créditos ou mais', false);

-- Eletivas
INSERT INTO subjects (course_id, name, credits, hours, semester, prerequisites, is_elective) VALUES
('123e4567-e89b-12d3-a456-426614174000', 'Banco de Dados', 4, 60, 0, 'Engenharia de Software', true),
('123e4567-e89b-12d3-a456-426614174000', 'Compiladores', 4, 60, 0, 'Linguagens Formais e Autômatos', true),
('123e4567-e89b-12d3-a456-426614174000', 'Controle Digital de Processos', 4, 60, 0, 'Sistemas de Controle; Processamento Digital de Sinais', true),
('123e4567-e89b-12d3-a456-426614174000', 'Educação Ambiental e Sustentabilidade', 4, 60, 0, 'Sem pré-requisitos', true),
('123e4567-e89b-12d3-a456-426614174000', 'Educação, diversidade e direitos humanos', 4, 60, 0, 'Sem pré-requisitos', true),
('123e4567-e89b-12d3-a456-426614174000', 'Engenharia Econômica', 2, 30, 0, 'Probabilidade e Estatística', true),
('123e4567-e89b-12d3-a456-426614174000', 'Eletromagnetismo Aplicado', 4, 60, 0, 'Cálculo IV, Física IV', true),
('123e4567-e89b-12d3-a456-426614174000', 'Gerência de Redes', 4, 60, 0, 'Redes de Computadores', true),
('123e4567-e89b-12d3-a456-426614174000', 'Gestão da Inovação', 4, 60, 0, 'Gestão e Empreendedorismo', true),
('123e4567-e89b-12d3-a456-426614174000', 'Gestão de Pessoas', 4, 60, 0, '100 créditos', true),
('123e4567-e89b-12d3-a456-426614174000', 'Inteligência Artificial', 4, 60, 0, 'Engenharia de Software', true),
('123e4567-e89b-12d3-a456-426614174000', 'Libras', 4, 60, 0, 'Sem pré-requisitos', true),
('123e4567-e89b-12d3-a456-426614174000', 'Língua Inglesa I', 2, 30, 0, 'Sem pré-requisitos', true),
('123e4567-e89b-12d3-a456-426614174000', 'Língua Inglesa II', 2, 30, 0, 'Língua Inglesa I', true),
('123e4567-e89b-12d3-a456-426614174000', 'Língua Inglesa III', 4, 60, 0, 'Língua Inglesa II', true),
('123e4567-e89b-12d3-a456-426614174000', 'Linguagens Formais e Autômatos', 4, 60, 0, 'Teoria da Computação', true),
('123e4567-e89b-12d3-a456-426614174000', 'Materiais de Engenharia', 4, 60, 0, 'Física II; Fisica III', true),
('123e4567-e89b-12d3-a456-426614174000', 'Processamento de Imagens', 4, 60, 0, 'Cálculo IV', true),
('123e4567-e89b-12d3-a456-426614174000', 'Produção Textual', 4, 60, 0, 'Sem pré-requisitos', true),
('123e4567-e89b-12d3-a456-426614174000', 'Programação Paralela', 4, 60, 0, 'Sistemas Operacionais', true),
('123e4567-e89b-12d3-a456-426614174000', 'Projeto Analógico Integrado', 4, 60, 0, 'Projeto de Sistemas Integrados I', true),
('123e4567-e89b-12d3-a456-426614174000', 'Projeto de Sistemas Embarcados e de Tempo Real', 4, 60, 0, 'Sistemas de Tempo Real', true),
('123e4567-e89b-12d3-a456-426614174000', 'Projeto de Sistemas Integrados II', 4, 60, 0, 'Projeto de Sistemas Integrados I', true),
('123e4567-e89b-12d3-a456-426614174000', 'Tópicos Especiais em Acionamentos Eletrônicos', 4, 60, 0, 'Eletrônica II', true),
('123e4567-e89b-12d3-a456-426614174000', 'Teoria da Computação', 4, 60, 0, 'Estrutura de Dados', true),
('123e4567-e89b-12d3-a456-426614174000', 'Tópicos Especiais em Bioeletrônica', 4, 60, 0, 'Ter cursado no mínimo 200 créditos', true),
('123e4567-e89b-12d3-a456-426614174000', 'Tópicos Especiais em Comunicação de Dados', 4, 60, 0, 'Comunicação de Dados', true),
('123e4567-e89b-12d3-a456-426614174000', 'Tópicos Especiais em Programação de Computadores', 4, 60, 0, 'Estrutura de Dados', true),
('123e4567-e89b-12d3-a456-426614174000', 'Tópicos Especiais em Robótica', 4, 60, 0, 'Sistemas de Controle', true),
('123e4567-e89b-12d3-a456-426614174000', 'Tópicos Especiais em Sensores Inteligentes', 4, 60, 0, 'Instrumentação Eletrônica', true),
('123e4567-e89b-12d3-a456-426614174000', 'Tópicos Especiais em Sistemas Distribuídos', 4, 60, 0, 'Sistemas Distribuídos', true),
('123e4567-e89b-12d3-a456-426614174000', 'Tópicos Especiais em Sistemas Eletrônicos', 4, 60, 0, 'Eletrônica II', true),
('123e4567-e89b-12d3-a456-426614174000', 'Tópicos Especiais em Sistemas Embarcados e de Tempo Real', 4, 60, 0, 'Sistemas de Tempo Real', true),
('123e4567-e89b-12d3-a456-426614174000', 'Tópicos Especiais Engenharia de Software', 4, 60, 0, 'Engenharia de Software; Banco de Dados', true),
('123e4567-e89b-12d3-a456-426614174000', 'Tópicos Especiais em Computação', 4, 60, 0, '100 créditos', true),
('123e4567-e89b-12d3-a456-426614174000', 'Tópicos Especiais em Engenharia', 4, 60, 0, '100 créditos', true),
('123e4567-e89b-12d3-a456-426614174000', 'Seminários de tópicos do estado-da-arte', 4, 60, 0, '100 créditos', true),
('123e4567-e89b-12d3-a456-426614174000', 'Tópicos Especiais de Segurança da Informação', 4, 60, 0, 'Redes de Computadores', true),
('123e4567-e89b-12d3-a456-426614174000', 'Eletiva de Livre Escolha I', 4, 60, 0, 'Máximo de 4 créditos cursados em qualquer área de conhecimento', true),
('123e4567-e89b-12d3-a456-426614174000', 'Eletiva de Livre Escolha II', 4, 60, 0, 'Máximo de 4 créditos cursados em qualquer área de conhecimento', true),
('123e4567-e89b-12d3-a456-426614174000', 'Aprendizado de Máquina', 4, 60, 0, 'Cálculo IV', true);
