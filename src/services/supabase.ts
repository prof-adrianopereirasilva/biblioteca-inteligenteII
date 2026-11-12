
import { createClient } from '@supabase/supabase-js';
import type { StudyQuote } from '../types';

// Variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificação das configurações
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Configurações do Supabase não encontradas. Verifique o arquivo .env'
  );
}

// Conexão com Supabase
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Função responsável por buscar as frases
export async function buscarFrases(): Promise<StudyQuote[]> {
  const { data, error } = await supabase
    .from('study_quotes')
    .select('id, frase, autor, categoria')
    .eq('ativo', true);

  // Verifica se ocorreu algum erro
  if (error) {
    console.error('Erro ao buscar frases:', error);
    throw error;
  }

  return data ?? [];
}
