import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Echo } from '../../types/echo';
import { moods } from '../../types/mood';

const moodConfig = moods.reduce((acc, m) => ({ ...acc, [m.id]: m }), {} as Record<string, typeof moods[0]>);

interface MomentCanvasProps {
  echo: Echo;
  className?: string;
}

export function MomentCanvas({ echo, className = '' }: MomentCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const mood = moodConfig[echo.mood];
  const glowColor = mood?.color || 'var(--color-primary)';

  return (
    <div
      ref={canvasRef}
      className={`relative w-full min-h-[660px] rounded-xl bg-surface-container-lowest/60 backdrop-blur-3xl overflow-hidden flex items-center justify-center p-space-md lg:p-space-xl shadow-2xl ${className}`}
    >
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="relative flex items-center justify-center w-80 h-80">
          <motion.div
            className="absolute inset-0 rounded-full blur-[80px]"
            style={{ backgroundColor: `${glowColor}1A` }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-0 rounded-full border"
            style={{ borderColor: `${glowColor}33` }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-6 rounded-full border border-dashed"
            style={{ borderColor: `${glowColor}4D` }}
          />
          <motion.div
            className="absolute inset-16 rounded-full border"
            style={{ borderColor: `${glowColor}1A` }}
          />

          <motion.div
            className="relative w-28 h-28 rounded-full backdrop-blur-xl p-1 flex flex-col items-center justify-center text-center"
            style={{ 
              background: `linear-gradient(135deg, ${glowColor}66, ${glowColor}33)`,
              boxShadow: `0 0 50px ${glowColor}66`,
            }}
            animate={{ 
              boxShadow: [
                `0 0 50px ${glowColor}66`,
                `0 0 70px ${glowColor}99`,
                `0 0 50px ${glowColor}66`,
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <motion.span
              className="material-symbols-outlined animate-bounce"
              style={{ 
                color: glowColor, 
                fontSize: '32px',
                animationDuration: '3s',
              }}
            >
              {mood?.icon === 'lens_blur' ? 'water_drop' : mood?.icon}
            </motion.span>
            <span className="font-label-sm text-label-sm tracking-widest" style={{ color: glowColor }}>
              432Hz
            </span>
            <span className="font-label-sm text-[8px] text-on-surface-variant uppercase">ECHO CORE</span>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 w-full h-full flex items-center justify-center p-space-md">
        <div className="absolute top-8 left-4 sm:left-12 max-w-[280px] group cursor-pointer">
          <div className="relative rounded-lg p-space-xs bg-surface-container-high/80 backdrop-blur-xl shadow-[0_12px_36px_rgba(0,0,0,0.7)] rotate-[-3deg] hover:rotate-0 transition-transform group-hover:scale-105">
            <div className="relative w-full h-44 rounded overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRZjP7HuM3W6B713ZdkIAcfJisFdQPzMO2fq_pYr9g1dKt9ICEZIr_E-hWmzFvGtFA_E6gJ9vG1ROHCFZ8F8yZY9U-Dr2rggxYsxNFy6Gsit0rrLHeUnCC1NWG8VXj6wlbMlulEzIPA_rwn6KmyoJoTDXCJBB26dOPakGmi0PdRdURqxw7ZGdoAxP-W3AOOFH6MG2O1JNky2xGrxp1RaXCampZGt4S65Micuf7Tpm3ZsWgVi3PIVT0"
                alt="Marine Drive Mumbai rain night"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent" />
              <span className="absolute top-2 left-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/80 font-label-sm text-label-sm text-primary backdrop-blur-sm">
                SOUL #104 · 23:14
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface px-space-2xs pt-space-xs pb-space-2xs italic">
              "The Arabian Sea is loud tonight. Salt and asphalt."
            </p>
          </div>
        </div>

        <div className="absolute top-12 right-4 sm:right-16 max-w-[320px] group cursor-pointer">
          <div className="rounded-lg p-space-md bg-gradient-to-br from-surface-container-high/90 via-surface-container/70 to-secondary-container/20 backdrop-blur-2xl shadow-[0_16px_40px_rgba(255,178,185,0.1)] rotate-[2deg] hover:rotate-0 transition-transform group-hover:scale-105">
            <div className="flex items-center justify-between pb-space-2xs">
              <div className="flex items-center gap-space-2xs">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">MEMORIC SCENT</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Soul #42</span>
            </div>
            <blockquote className="font-display-lg-mobile text-body-lg text-on-surface font-light leading-relaxed my-space-xs">
              "It smells like childhood monsoons, wet concrete, and chai."
            </blockquote>
            <div className="flex items-center justify-between pt-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant">28 aligned memories</span>
              <span className="material-symbols-outlined text-secondary text-[16px]">bubble_chart</span>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 -translate-y-12 right-2 sm:right-28 max-w-[270px] group cursor-pointer">
          <div className="rounded-full px-space-md py-space-sm bg-surface-container-highest/90 backdrop-blur-xl shadow-[0_0_24px_rgba(78,230,170,0.2)] flex items-center gap-space-sm group-hover:scale-105 transition-transform">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-lg"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">play_arrow</span>
            </motion.button>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-2xs">
                <span className="font-label-sm text-label-sm text-tertiary font-bold tracking-wider">🎙️ 00:14</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">· Waves & Thunder</span>
              </div>
              <div className="flex items-center gap-1 mt-1 h-3">
                <span className="w-1 h-2 rounded-full bg-tertiary animate-pulse" />
                <span className="w-1 h-3 rounded-full bg-tertiary" />
                <span className="w-1 h-1.5 rounded-full bg-tertiary/60" />
                <span className="w-1 h-3 rounded-full bg-tertiary" />
                <span className="w-1 h-2.5 rounded-full bg-tertiary animate-pulse" />
                <span className="w-1 h-1 rounded-full bg-tertiary/40" />
                <span className="w-1 h-3 rounded-full bg-tertiary" />
                <span className="w-1 h-2 rounded-full bg-tertiary/80" />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-16 left-6 sm:left-24 max-w-[340px] group cursor-pointer">
          <div className="rounded-lg p-space-md bg-surface-container-low/85 backdrop-blur-2xl shadow-xl rotate-[-1deg] hover:rotate-0 transition-transform group-hover:scale-105">
            <div className="flex items-center gap-space-2xs pb-space-2xs">
              <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase">MASS SYNCHRONICITY</span>
              <span className="text-on-surface-variant font-label-sm">· 22M SOULS</span>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface tracking-tight font-light">
              "Rain makes 22 million people slow down at the exact same second."
            </p>
            <div className="mt-space-sm flex items-center gap-space-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">graphic_eq</span>
              <span className="font-label-sm text-label-sm">Whispered into the void by Soul #91</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 right-6 sm:right-20 max-w-[240px] hidden sm:block group cursor-pointer">
          <div className="rounded-lg p-space-xs bg-surface-container-high/70 backdrop-blur-xl shadow-2xl rotate-[3deg] hover:rotate-0 transition-transform group-hover:scale-105">
            <div className="relative w-full h-36 rounded overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxZbLjUNj38OGbPPPOoTES6t6Vi0CjljwY2tBSjUZDdPI5VqwO-F7I9OB6-SmoakvcNju-NdCYcFcd3CDQhGBh8v9lirWqpFZkFm4DhVc4adj9svYdvHFhl5CpHcB6KJm-pK7-649vS8m5YR-M6VebczeeqvTDpYIAhjHcLyzc9cBk-A4m55YPBHCbqezJeG3oXkKj4JFAdbzm-qtBTQREf1FQI48_Z9hEutUQMuxyJtXNirfpCzyp"
                alt="Bandra café window rain"
              />
              <span className="absolute bottom-2 right-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/80 font-label-sm text-label-sm text-secondary">
                Bandra Pali Hill
              </span>
            </div>
          </div>
        </div>

        <div className="absolute -top-3 sm:top-4 left-1/2 -translate-x-1/2 group cursor-pointer">
          <div className="flex items-center gap-space-sm px-space-md py-space-xs rounded-full bg-surface-container-lowest/90 backdrop-blur-2xl shadow-[0_0_30px_rgba(56,189,248,0.25)] hover:bg-surface-container-high transition-all group-hover:scale-105">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-primary to-tertiary flex items-center justify-center animate-spin" style={{ animationDuration: '6s' }}>
              <span className="material-symbols-outlined text-on-primary text-[14px]">music_note</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface font-medium">"Iktara" (Wake Up Sid)</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant hidden md:inline">Contributed by Soul #881</span>
            <span className="material-symbols-outlined text-primary text-[16px]">waves</span>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-space-2xs bg-surface-container-lowest/85 backdrop-blur-xl rounded-full px-space-md py-space-2xs shadow-2xl">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider pr-space-2xs hidden md:inline">COLLECTIVE PERSPECTIVE</span>
          <div className="flex -space-x-2 overflow-hidden">
            {[
              'https://lh3.googleusercontent.com/aida-public/AB6AXuDRQ_nVpCVvB00bCnMRxYpnziEEPRpSd5B8nmxHmKbowglZfEyHsZzuOqfIfGMPsLj9FdJA2vyI0vu1Qf52etTM-Ek166R4aFGaswC0txC52jE3w0ZpR0N-_0nYNnKZlMIjXQZzAqlwoAC9vNWqq-YWxN31jwZr9AtvMCu4Cps7DsA-PkfxbNxYPFqn5lpHzH5ts7xVKx6V8wwfQCZIefelbpjHPfN4LvKcY2GBGUWM-InC8Fr0oZvo',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuA1HER-7ryjF8tLlhKtkqoHlTZtcPieLPrzEmcStqD1H15ZkqhbJkA_dltxgUXPbR0i-n8PAEFWZmBvW8S2lIz3R7t0P0MwCFRRbooVT1fSBqc0z8swPxkmdk-0qtdHtMfYLTRmQb3t5EGIVm5lYyydaOwNYh-xeyGScnK-WnH63GLHnM3cgRIfPwZIbcCppZXuyWGWFEgHKustF17bYgQ9o7g9DX7PWKPWzNORPp4qNDQ-JsnOGrAh',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCtaRSa8DTB2xE_NxdyKQBidjbCJJoyZ1ziI17qSutWvFw3pvGVMwI1RZOtrwxFsOluLb9X7YzWIY17-ciXv1O4Kx1BVHXr3zVmmm3ybP2RoRO46cfQYPg7yqBdfi8FhixwFKzqfmElNAsQg8cf_jXmv3xMQvOsjlSTTjU_ORZVq3n-fSLNPq4GjMLkr0YxGoBMv-foObnus_afcPstn8uItBM0XOr7jFMaBS9_wuZ-B85ZE3WQmYHm',
              'https://lh3.googleusercontent.com/aida-public/AB6AXuCyTS7uUGBMV8ECVE9XBIsThORwjp4wQaS3jFPc3IpyAKomxna7HgBO9B8MiEtewQA9kiCWX-U-hBYK9gMNGJfr_kUvo8tLF9Ykuu6nSSVffIzFS2PHo7rMbXjyePMR0Dubu9iWpk6kpitpCq4qhzs06SBNd2hwYeNaIUGVTKy-n75F9ZXka74jztWkEVsCmPLAAoJatUKHu-gBrjz__IoQBwjl0-PorH-vX-Nl0DksnIJAEcssw_sk',
            ].map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                className="w-8 h-8 rounded-full overflow-hidden shadow-md"
              >
                <img className="w-full h-full object-cover" src={src} alt={`Perspective ${i + 1}`} />
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-space-2xs flex items-center gap-1 px-space-sm py-1 rounded-full bg-primary-container text-on-primary-container font-label-sm text-label-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[14px]">add_photo_alternate</span>
            <span>Add Lens</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}