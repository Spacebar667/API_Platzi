import { supabase } from '../supabase';

export async function obtenerComprasUsuario(usuarioId) {
  const { data, error } = await supabase
    .from('comprado')
    .select(`
      id,
      fecha_compra,
      producto: producto (
        id,
        nombre,
        descripcion,
        precio
      )
    `)
    .eq('usuarioid', usuarioId);

  if (error) {
    console.error('Error al obtener compras:', error);
    return [];
  }

  return data;
}