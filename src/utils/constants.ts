export const BASE_URL = 'http://localhost:3005';
export const AVIABLE_COLORS = ["bg-red-700", "bg-blue-700", "bg-orange-400", "bg-orange-700", "bg-amber-500", "bg-amber-950", "bg-slate-700", "bg-slate-900", "bg-lime-600", "bg-emerald-600", "bg-teal-600", "bg-sky-700", "bg-indigo-700", "bg-fuchsia-900", "bg-pink-800", "bg-pink-950"];

export const FONT_SIZES = ['8px', '9px', '10px', '12px', '14px', '16px', '20px', '24px', '32px', '42px', '54px', '68px', '84px', '98px'];
export const FONT_FAMILIES = ['Roboto', 'Poiret One', 'JetBrains Mono', 'Pixelify Sans', 'Play', 'Amatic SC', 'Ubuntu Mono', 'Advent Pro'];
export const FONT_FAMILIES_NO_SPACE = FONT_FAMILIES.map(font => font.replace(' ', ''));

export const QUIL_MODULES = {
   toolbar: [
      [{ 'font': FONT_FAMILIES_NO_SPACE }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': FONT_SIZES }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      ["link", "image", "video"],
      ['clean']
   ]
}