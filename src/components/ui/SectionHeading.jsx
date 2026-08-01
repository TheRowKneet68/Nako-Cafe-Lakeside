import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <Reveal>
        <span className="eyebrow inline-flex items-center gap-3">
          <span className="h-px w-8 bg-gold/60" />
          {eyebrow}
          <span className="h-px w-8 bg-gold/60" />
        </span>
        <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">{title}</h2>
        {subtitle && (
          <p className={`mt-4 max-w-2xl leading-relaxed text-ink/60 ${center ? 'mx-auto' : ''}`}>
            {subtitle}
          </p>
        )}
      </Reveal>
    </div>
  )
}
