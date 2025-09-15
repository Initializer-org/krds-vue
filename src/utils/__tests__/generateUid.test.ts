import { describe, it, expect } from 'vitest'
import { generateUid } from '../index'

describe('generateUid', () => {
  it('7자리 문자열을 반환해야 함', () => {
    const uid = generateUid()
    expect(uid).toHaveLength(7)
  })

  it('base36 문자만 포함해야 함', () => {
    const uid = generateUid()
    expect(uid).toMatch(/^[0-9a-z]{7}$/)
  })

  it('매번 다른 값을 생성해야 함', () => {
    const uids = new Set()
    for (let i = 0; i < 100; i++) {
      uids.add(generateUid())
    }
    // 100개 생성 시 최소 95개는 고유해야 함 (충돌 허용치 5%)
    expect(uids.size).toBeGreaterThanOrEqual(95)
  })

  it('타임스탬프 기반으로 시간순 정렬이 가능해야 함', () => {
    const uid1 = generateUid()
    // 짧은 지연 후 생성
    setTimeout(() => {
      const uid2 = generateUid()
      // 앞 4자리(타임스탬프)는 증가하거나 같아야 함
      expect(uid2.slice(0, 4) >= uid1.slice(0, 4)).toBe(true)
    }, 10)
  })
})
