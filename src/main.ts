import * as core from '@actions/core'

const MAX_SLUG_STRING_SIZE = 63

function trailHyphen(envVar: string): string {
  return envVar.replace(RegExp('^-*', 'g'), '').replace(RegExp('-*$', 'g'), '')
}

function replaceAnyNonAlphanumericCharacter(envVar: string): string {
  return envVar.replace(RegExp('[^a-zA-Z0-9._]', 'g'), '-')
}

function replaceAnyNonUrlCharactersWithHyphen(envVar: string): string {
  return envVar.replace(RegExp('[._]', 'g'), '-')
}

function removeRef(envVar: string): string {
  return envVar.replace(RegExp('^refs/(heads|tags|pull)/'), '')
}

export function slug_cs(envVar: string): string {
  return trailHyphen(replaceAnyNonAlphanumericCharacter(envVar)).substring(
    0,
    MAX_SLUG_STRING_SIZE
  )
}

export function slug(envVar: string): string {
  return slug_cs(envVar.toLowerCase())
}

export function slugref_cs(envVar: string): string {
  return slug_cs(removeRef(envVar))
}

export function slugref(envVar: string): string {
  return slugref_cs(envVar.toLowerCase())
}

export function slugurl_cs(envVar: string): string {
  return slug_cs(replaceAnyNonUrlCharactersWithHyphen(envVar))
}

export function slugurl(envVar: string): string {
  return slug(replaceAnyNonUrlCharactersWithHyphen(envVar))
}

async function run(): Promise<void> {
  try {
    const value = core.getInput('value')
    core.setOutput('result', slugurl(value))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
