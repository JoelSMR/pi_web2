import { DropdownItem } from "@/app/GlobalComponents/Renders/Dropdown";
import { Provider,EditableProvider, NewProviderToCreate } from "@/app/modules/Dashboard/Renders/Providers/Models/ProviderModels";


export const ProviderToEditProvider=async(oldProvider:Provider)=>{
    const productMapped:EditableProvider ={
      nombre: oldProvider.nombre,
      email: oldProvider.email,
      telefono:oldProvider.telefono
    }
    return productMapped    
}

export const CreateProviderToProvider=(createdProvider:NewProviderToCreate)=>{
  const providerMapped:Provider={
    idProveedor: 0,
    nombre: createdProvider.nombre,
    email: createdProvider.email,
    telefono:createdProvider.telefono
  }
  return providerMapped
}

/**  
 * Mapea un solo Provider a DropDownItem.  
 */  
export const providerToDropDownItem = (p: Provider): DropdownItem => ({  
  id: p.idProveedor,  
  name: p.nombre,  
}
);

/**  
 * Mapea un array de Provider a DropDownItem[].  
 *  
 * Opcionalmente:  
 * - `sortByName`: ordena el resultado por `name` asc/desc.  
 * - `dedupeById`: elimina duplicados por `id` conservando la primera aparición.  
 */  
export function mapProvidersToDropDownItems(  
  providers: Provider[] | null | undefined,  
  options?: {  
    sortByName?: 'asc' | 'desc';  
    dedupeById?: boolean;  
  }  
): DropdownItem[] {  
  if (!providers?.length) return [];  
  
  let items = providers.map(providerToDropDownItem);  
  
  if (options?.dedupeById) {  
    const seen = new Set<number>();  
    items = items.filter((it) => (seen.has(it.id) ? false : (seen.add(it.id), true)));  
  }  
  
  if (options?.sortByName) {  
    const dir = options.sortByName === 'desc' ? -1 : 1;  
    items = items.slice().sort((a, b) => a.name.localeCompare(b.name) * dir);  
  }  
  
  return items;  
}  
  
/* Ejemplo de uso:  
  
const providers: Provider[] = [  
  { idProveedor: 2, nombre: 'Globex', telefono: '...', email: '...' },  
  { idProveedor: 1, nombre: 'Acme', telefono: '...', email: '...' },  
];  
  
const items = mapProvidersToDropDownItems(providers, { sortByName: 'asc', dedupeById: true });  
// items => [{ id: 1, name: 'Acme' }, { id: 2, name: 'Globex' }]  
  
*/


