'use client'
import React from 'react';

export type DropdownItem = { id: number; name: string };

interface DropdownProps {
  items: DropdownItem[];
  selectedId?: number | null;
  onSelect?: (id: number) => void;
  placeholder?: string;
  className?: string;
  buttonClassName?: string;
  menuClassName?: string;
  id?: string; // Para asociar con <label htmlFor={id}>
  disabled?: boolean;
}

/**
 * Dropdown accesible y autocontenido:
 * - Recibe items {id, name}.
 * - Renderiza un botón que despliega/oculta el menú.
 * - Al seleccionar un item, guarda el id en su estado interno y notifica vía `onSelect`.
 * - Pensado para convivir dentro de un Modal (usa `absolute` + `z-50` para evitar problemas de jerarquía).
 * - Navegación por teclado: Enter/Espacio abre, Up/Down navega, Enter selecciona, Esc cierra.
 */
export  const Dropdown: React.FC<DropdownProps> = ({
  items,
  selectedId = null,
  onSelect,
  placeholder = 'Selecciona una opción',
  className,
  buttonClassName,
  menuClassName,
  id,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [internalSelectedId, setInternalSelectedId] = React.useState<number | null>(selectedId);
  const [highlightIndex, setHighlightIndex] = React.useState<number>(-1);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Sincroniza controlado/semicontrolado
  React.useEffect(() => {
    setInternalSelectedId(selectedId ?? null);
  }, [selectedId]);

  // Cerrar al hacer click fuera o al presionar Esc
  React.useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onDocKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onDocKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onDocKeyDown);
    };
  }, []);

  const selectedLabel =
    internalSelectedId != null ? items.find((i) => i.id === internalSelectedId)?.name : undefined;

  function handleSelect(item: DropdownItem) {
    setInternalSelectedId(item.id);
    onSelect?.(item.id);
    setOpen(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    // Abrir con Enter/Espacio/ArrowDown
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
      setOpen(true);
      const currentIndex = items.findIndex((i) => i.id === internalSelectedId);
      setHighlightIndex(currentIndex >= 0 ? currentIndex : 0);
      e.preventDefault();
      return;
    }
    if (!open) return;

    if (e.key === 'ArrowDown') {
      setHighlightIndex((prev) => Math.min(items.length - 1, prev + 1));
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      setHighlightIndex((prev) => Math.max(0, prev - 1));
      e.preventDefault();
    } else if (e.key === 'Enter') {
      const item = items[highlightIndex];
      if (item) handleSelect(item);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setOpen(false);
      e.preventDefault();
    }
  }

  return (
    <div ref={containerRef} className={className ?? ''}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? `${id}-menu` : undefined}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className={`rounded-md border border-gray-300 px-3 py-2 text-left text-sm text-gray-900 shadow-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-100 ${buttonClassName ?? ''} ${
          disabled ? 'opacity-60 cursor-not-allowed' : ''
        }`}
      >
        <span>{selectedLabel ?? placeholder}</span>
        <span className="float-right text-gray-500">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <ul
          id={`${id}-menu`}
          role="listbox"
          aria-labelledby={id}
          className={`absolute z-50 mt-1 max-h-56 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800 ${menuClassName ?? ''}`}
        >
          {items.length === 0 ? (
            <li className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">Sin opciones</li>
          ) : (
            items.map((item, idx) => {
              const isSelected = item.id === internalSelectedId;
              const isHighlighted = idx === highlightIndex;

              return (
                <li
                  key={item.id}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setHighlightIndex(idx)}
                  onClick={() => handleSelect(item)}
                  className={`cursor-pointer px-3 py-2 text-sm
                    ${isSelected ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-200' : ''}
                    ${isHighlighted && !isSelected ? 'bg-gray-100 dark:bg-neutral-700' : ''}
                    text-gray-900 dark:text-gray-100`}
                >
                  {item.name}
                </li>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
};
export default Dropdown