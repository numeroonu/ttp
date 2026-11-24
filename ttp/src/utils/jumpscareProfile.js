export function getJumpscareProfile(creature) {
  const danger = `${creature?.dangerLevel || ''} ${creature?.classification || ''}`.toLowerCase()

  if (danger.includes('cataclysmic') || danger.includes('cosmic')) {
    return { tone: 'cosmic', duration: 1050, fade: 220 }
  }
  if (
    danger.includes('lethal') ||
    danger.includes('malign') ||
    danger.includes('hexcraft') ||
    danger.includes('corpse')
  ) {
    return { tone: 'lethal', duration: 820, fade: 180 }
  }
  if (
    danger.includes('high') ||
    danger.includes('disorient') ||
    danger.includes('fatal') ||
    danger.includes('decept')
  ) {
    return { tone: 'high', duration: 680, fade: 160 }
  }
  return { tone: 'mild', duration: 520, fade: 140 }
}
