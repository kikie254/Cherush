# 📸 Cherush Stay Iten — Image Upload Guide

All site images live in `public/images/`. Drop your photos into the correct
subfolder using the exact filename shown below.

---

## 📐 Image Specs

| Use Case    | Max Width | Format | Max File Size |
|-------------|-----------|--------|---------------|
| Hero        | 1920 px   | WebP   | < 200 KB      |
| Rooms       | 1200 px   | WebP   | < 150 KB      |
| Thumbnails  | 600 px    | WebP   | < 80 KB       |

**Naming convention:** `cherush-[category]-[description]-[number].webp`

---

## 📁 Folder Structure & Required Files

### `/images/hero/` — Main hero images (homepage banner)

| Filename | Description | Status |
|----------|-------------|--------|
| `cherush-exterior-sunrise-hero.webp` | Primary hero — exterior at sunrise | ✅ Uploaded |
| `cherush-exterior-golden-hour.webp` | Alternate hero — golden hour exterior | ❌ Missing |

---

### `/images/rooms/` — One Bedroom room images

| Filename | Description | Status |
|----------|-------------|--------|
| `cherush-one-bedroom-iten-kenya-bed.webp` | Bed / main sleeping area | ✅ Uploaded |
| `cherush-one-bedroom-iten-kenya-bedroom-closet.webp` | Bedroom with wardrobe/closet | ✅ Uploaded |
| `cherush-one-bedroom-iten-kenya-living-room.webp` | Living room lounge area | ✅ Uploaded |
| `cherush-one-bedroom-iten-kenya-kitchen.webp` | Kitchenette / cooking area | ✅ Uploaded |
| `cherush-one-bedroom-iten-kenya-bathroom.webp` | Bathroom overview | ✅ Uploaded |
| `cherush-one-bedroom-iten-kenya-bathroom-tub.webp` | Bathroom with tub detail | ✅ Uploaded |

---

### `/images/bathroom/` — Bathroom images

| Filename | Description | Status |
|----------|-------------|--------|
| `cherush-bathroom-clean-modern.webp` | Clean, modern bathroom overview | ❌ Missing |
| `cherush-bathroom-shower.webp` | Shower detail / hot shower feature | ❌ Missing |

---

### `/images/kitchen/` — Kitchen images

| Filename | Description | Status |
|----------|-------------|--------|
| `cherush-kitchen-full-setup.webp` | Full kitchen setup / appliances | ❌ Missing |
| `cherush-kitchen-dining.webp` | Dining area / kitchen table setup | ❌ Missing |

---

### `/images/workspace/` — Workspace / desk images

| Filename | Description | Status |
|----------|-------------|--------|
| `cherush-workspace-desk-setup.webp` | Clean desk setup, good lighting | ❌ Missing |
| `cherush-workspace-window-view.webp` | Workspace with window / valley view | ❌ Missing |

---

### `/images/exterior/` — Exterior, garden & entrance images

| Filename | Description | Status |
|----------|-------------|--------|
| `cherush-garden-view.webp` | Garden area overview | ❌ Missing |
| `cherush-entrance.webp` | Property entrance / arrival shot | ❌ Missing |
| `cherush-building-front.webp` | Full building front-face photo | ❌ Missing |
| `cherush-exterior-sunrise-hero.webp` | Exterior at sunrise (copy of hero) | ✅ Uploaded |

---

### `/images/lifestyle/` — Lifestyle, training & morning images

| Filename | Description | Status |
|----------|-------------|--------|
| `cherush-coffee-morning.webp` | Morning coffee / relaxed start | ❌ Missing |
| `cherush-athlete-training.webp` | Athlete on trail or training route | ❌ Missing |

---

### `/images/gallery/` — Additional gallery images (optional extras)

This folder is for any supplemental photos used in the full gallery page
(beyond the core images above). Add as many as needed following the naming
convention.

| Example Filename | Description |
|------------------|-------------|
| `cherush-gallery-valley-view-01.webp` | Kerio Valley panoramic |
| `cherush-gallery-local-market-01.webp` | Nearby Iten market scene |
| `cherush-gallery-sunrise-trail-01.webp` | Morning trail run shot |

---

## ✅ Quick Checklist

- [ ] `hero/cherush-exterior-golden-hour.webp`
- [x] `rooms/cherush-one-bedroom-iten-kenya-bed.webp`
- [x] `rooms/cherush-one-bedroom-iten-kenya-bedroom-closet.webp`
- [x] `rooms/cherush-one-bedroom-iten-kenya-living-room.webp`
- [x] `rooms/cherush-one-bedroom-iten-kenya-kitchen.webp`
- [x] `rooms/cherush-one-bedroom-iten-kenya-bathroom.webp`
- [x] `rooms/cherush-one-bedroom-iten-kenya-bathroom-tub.webp`
- [ ] `bathroom/cherush-bathroom-clean-modern.webp`
- [ ] `bathroom/cherush-bathroom-shower.webp`
- [ ] `kitchen/cherush-kitchen-full-setup.webp`
- [ ] `kitchen/cherush-kitchen-dining.webp`
- [ ] `workspace/cherush-workspace-desk-setup.webp`
- [ ] `workspace/cherush-workspace-window-view.webp`
- [ ] `exterior/cherush-garden-view.webp`
- [ ] `exterior/cherush-entrance.webp`
- [ ] `exterior/cherush-building-front.webp`
- [ ] `lifestyle/cherush-coffee-morning.webp`
- [ ] `lifestyle/cherush-athlete-training.webp`

---

## 💡 Tips

- Convert photos to WebP using [Squoosh](https://squoosh.app) (free, browser-based).
- Shoot in **landscape orientation** (wider than tall) for hero & room images.
- Aim for **bright, natural light** — avoid heavy filters or dark shadows.
- After adding images, run `npm run dev` and check the site locally.
