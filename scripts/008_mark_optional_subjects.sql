-- Mark subjects that are "optional" - subjects that don't block linear progress
-- These are typically subjects that can be taken in flexible order or are not critical path

-- Update subjects to add is_optional column if it doesn't exist
ALTER TABLE subjects ADD COLUMN IF NOT EXISTS is_optional BOOLEAN DEFAULT false;

-- Mark commonly optional subjects (humanities, soft skills, etc.)
UPDATE subjects SET is_optional = true 
WHERE name IN (
  'Epistemologia',
  'Legislação e Ética',
  'Tecnologia, Ambiente e Sociedade',
  'Metodologia Científica',
  'Educação Ambiental e Sustentabilidade',
  'Educação, diversidade e direitos humanos',
  'Libras',
  'Língua Inglesa I',
  'Língua Inglesa II',
  'Língua Inglesa III',
  'Produção Textual',
  'Gestão de Pessoas',
  'Gestão e Empreendedorismo'
);

-- All electives are inherently optional
UPDATE subjects SET is_optional = true WHERE is_elective = true;
