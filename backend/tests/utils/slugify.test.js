const slugify = require('../../src/utils/slugify')

describe('slugify', () => {
  it('removes accents and converts to lowercase', () => {
    expect(slugify('Àéî Ò')).toBe('aei-o')
  })

  it('collapses multiple spaces and special characters', () => {
    expect(slugify('Fool -- Path!!')).toBe('fool-path')
  })

  it('returns an empty string for falsy input', () => {
    expect(slugify()).toBe('')
  })
})
