
# Slugify a string

This action simples call GitHub API to get the last deployment infos in a environment

```
- name: Slugify my string
  uses: Clovis-team/slugify-string@v1.0.0
  id: slugify_url
  with:
    value: ${{ env.STAGE_ENV }}
- name: show results
  run: |
    echo "${{ steps.slugify_url.outputs.result }}"
```

## How to do a new release:

Change the code, then:
```
npm run all
git add -A; git commit -m ""; git push
```

On github, draft a new release