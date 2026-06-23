'use client'

import { useState, useTransition } from 'react'
import { Save, Check } from 'lucide-react'
import type { SiteSetting } from '@/types'
import { upsertSiteSetting } from '@/lib/actions/admin'
import { SectionHeading } from '@/components/ui/section-heading'

export function AdminSettingsClient({ settings: initial }: { settings: SiteSetting[] }) {
  const [settings, setSettings] = useState(initial)
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState<string | null>(null)

  const handleSave = (setting: SiteSetting) => {
    startTransition(async () => {
      const res = await upsertSiteSetting(setting)
      if (res.ok) {
        setSaved(setting.id)
        setTimeout(() => setSaved(null), 2000)
      }
    })
  }

  const updateValue = (id: string, value: string) => {
    setSettings((prev) => prev.map((s) => s.id === id ? { ...s, value } : s))
  }

  return (
    <div className="space-y-8 pb-20">
      <div className="bg-white/40 backdrop-blur-3xl p-8 rounded-[32px] shadow-premium border border-white/50 space-y-8">
        <SectionHeading eyebrow="Admin" title="Site Settings" body="Manage NAP (Name, Address, Phone) and global site configuration values." />

        <div className="space-y-4">
          {settings.map((setting) => (
            <div key={setting.id} className="bg-white rounded-2xl border border-primary/5 p-6 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-xs text-accent">{setting.key}</p>
                  {setting.description && <p className="text-muted text-xs mt-0.5">{setting.description}</p>}
                </div>
                <button
                  onClick={() => handleSave(setting)}
                  disabled={isPending}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    saved === setting.id
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-primary text-white hover:bg-primary/90'
                  }`}
                >
                  {saved === setting.id ? <><Check className="w-3.5 h-3.5" /> Saved</> : <><Save className="w-3.5 h-3.5" /> Save</>}
                </button>
              </div>
              <input
                value={setting.value}
                onChange={(e) => updateValue(setting.id, e.target.value)}
                className="w-full border border-primary/10 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-accent"
              />
            </div>
          ))}
        </div>

        {settings.length === 0 && (
          <div className="text-center py-12 text-muted">
            No site settings found. Settings will appear here once Firebase is configured.
          </div>
        )}
      </div>
    </div>
  )
}
