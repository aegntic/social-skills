import { MarkText, MarkDrawn, MarkNetwork, MarkSigil } from "@/components/BrandMark";

/**
 * /brand — internal preview page for the 4 brand mark variants.
 * Compare side-by-side in light + dark. Not linked from main nav.
 * Delete or keep as a design-system reference after a winner is picked.
 */
export default function BrandPage() {
  return (
    <main className="min-h-screen px-8 py-16 bg-paper text-ink">
      <h1 className="text-4xl font-black tracking-tight mb-2">Brand marks</h1>
      <p className="text-muted mb-12 max-w-xl">
        Four variants. Pick one. The current production mark is <strong>Variant A</strong>.
        Toggle light/dark with the page&apos;s theme control.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        <MarkCard
          name="A — Text 'S/'"
          note="Current production. No SVG, just typography in wutang-metallic. The honest lazy choice."
        >
          <MarkText className="text-5xl" />
          <MarkText className="text-3xl" />
          <MarkText className="text-xl" />
        </MarkCard>

        <MarkCard
          name="B — Drawn 'S/'"
          note="SVG with the S and the slash as one continuous shape. Adds a horizontal-cut echo on the right that reads as a 'social /' abbreviation. Sharp, characterful."
        >
          <MarkDrawn className="h-16 text-ink" />
          <MarkDrawn className="h-10 text-ink" />
          <MarkDrawn className="h-6 text-ink" />
        </MarkCard>

        <MarkCard
          name="C — Network node"
          note="Quietly says 'this is one of several' — fits the aegntic network context. A central node with three smaller ones, connected by hairlines. Most editorial / least decorative."
        >
          <MarkNetwork className="h-20 text-ink" />
        </MarkCard>

        <MarkCard
          name="D — Sigil"
          note="Custom glyph, no letters. Two interlocking circles forming an S-shape with a horizontal cut. Most 'designed' — most likely to feel like a brand mark rather than a placeholder."
        >
          <MarkSigil className="h-20 text-ink" />
          <MarkSigil className="h-12 text-ink" />
          <MarkSigil className="h-6 text-ink" />
        </MarkCard>
      </div>

      <hr className="my-16 border-line" />

      <h2 className="text-2xl font-bold mb-4">In context (light)</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        {[MarkText, MarkDrawn, MarkNetwork, MarkSigil].map((M, i) => (
          <div key={i} className="clay p-4 flex items-center justify-between">
            <M className="h-8 text-ink" />
            <span className="text-xs text-muted">home</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">In context (dark — flip theme)</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-900 p-4 rounded-clay-md">
        {[MarkText, MarkDrawn, MarkNetwork, MarkSigil].map((M, i) => (
          <div key={i} className="clay-dark p-4 flex items-center justify-between">
            <M className="h-8 text-white" />
            <span className="text-xs text-slate-400">home</span>
          </div>
        ))}
      </div>
    </main>
  );
}

function MarkCard({ name, note, children }: { name: string; note: string; children: React.ReactNode }) {
  return (
    <div className="clay p-6">
      <div className="flex items-end gap-4 mb-4 min-h-[80px]">{children}</div>
      <h3 className="text-lg font-bold mb-1">{name}</h3>
      <p className="text-sm text-muted">{note}</p>
    </div>
  );
}
