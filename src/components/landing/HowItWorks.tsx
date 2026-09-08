import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'DISCOVER',
    description: 'Find moments happening right now',
    icon: 'explore',
    color: 'primary',
    gradient: 'from-primary/20 to-primary-container/20',
  },
  {
    number: '02',
    title: 'ENTER',
    description: 'Join people experiencing the same thing',
    icon: 'login',
    color: 'secondary',
    gradient: 'from-secondary/20 to-secondary-container/20',
  },
  {
    number: '03',
    title: 'CONTRIBUTE',
    description: 'Add a thought, photo, music or voice',
    icon: 'add_circle',
    color: 'tertiary',
    gradient: 'from-tertiary/20 to-tertiary-container/20',
  },
  {
    number: '04',
    title: 'LEAVE A TRACE',
    description: 'Become part of a temporary collective memory',
    icon: 'footprint',
    color: 'primary-fixed',
    gradient: 'from-primary/20 to-primary-fixed/20',
  },
];

export function HowItWorks({ className = '' }: { className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      className={`relative w-full max-w-6xl mx-auto px-viewport-inset py-space-4xl ${className}`}
    >
      <div className="text-center max-w-2xl mx-auto mb-space-3xl">
        <span className="font-label-md text-label-md text-primary uppercase tracking-widest block mb-space-xs">The Journey</span>
        <h2 className="font-display-lg text-display-lg text-on-surface">HOW ECHO WORKS</h2>
        <p className="font-body-md text-body-md text-on-surface-variant mt-space-sm">
          A simple flow from discovery to collective memory. No complexity. Just presence.
        </p>
      </div>

      <div className="relative">
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 hidden lg:block"
          style={{ background: 'linear-gradient(to bottom, var(--color-primary), var(--color-secondary), var(--color-tertiary))' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
        />
        
        <div className="space-y-space-2xl">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`flex flex-col lg:flex-row items-center gap-space-xl ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} relative`}
            >
              <div className="relative lg:w-1/2 flex items-center justify-center lg:justify-end lg:pr-space-xl">
                <motion.div
                  className={`relative w-48 h-48 lg:w-56 lg:h-56 rounded-3xl flex items-center justify-center overflow-hidden ${step.gradient}`}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"
                  />
                  <motion.div
                    className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-surface-container-lowest/80 backdrop-blur-xl flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)]"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  >
                    <span className="material-symbols-outlined text-4xl lg:text-5xl" style={{ color: `var(--color-${step.color})` }}>
                      {step.icon}
                    </span>
                    <motion.div
                      className="absolute inset-0 rounded-full border border-dashed"
                      style={{ borderColor: `var(--color-${step.color})80` }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-space-md py-space-xs rounded-full bg-surface-container-lowest/90 backdrop-blur-xl text-on-surface font-label-sm text-label-sm uppercase tracking-wider shadow-lg"
                  >
                    STEP {step.number}
                  </motion.div>
                </motion.div>
                
                <motion.div
                  className="absolute lg:left-full lg:-translate-x-1/2 lg:top-1/2 w-8 h-8 rounded-full border-4 flex items-center justify-center"
                  style={{ 
                    borderColor: `var(--color-${step.color})`,
                    backgroundColor: 'var(--color-surface-container-lowest)',
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: `var(--color-${step.color})` }}
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.5 }}
                  />
                </motion.div>
              </div>

              <div className="lg:w-1/2 text-center lg:text-left lg:pl-space-xl">
                <motion.div
                  className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full mb-space-md"
                  style={{ backgroundColor: `var(--color-${step.color})20` }}
                >
                  <span className="font-label-sm text-label-sm uppercase tracking-wider" style={{ color: `var(--color-${step.color})` }}>
                    Step {step.number}
                  </span>
                </motion.div>
                <h3 className="font-headline-lg text-headline-lg text-on-surface mb-space-sm">{step.title}</h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant font-light max-w-md lg:max-w-none">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}