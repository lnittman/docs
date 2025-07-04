# Font Assets Reference
**Last Updated**: 2025-01-03  
**Status**: Integrated into docs repository with Git LFS

## Available Font Families

All fonts are now stored in `/fonts/` directory and tracked with Git LFS for efficient version control.

### Premium Trial Fonts
- **Alcala** - Display and text variants (BlackDisplay, Bold, Italic, Roman)
- **Bertin** - Dot and Square experimental families
- **Brett** - Modern sans-serif
- **CX80** - Variable font with multiple axes
- **Exposure** - Extensive weight variations (-100 to +100)
- **Louize** - Condensed display family
- **Milling** - Simplex, Duplex, and Triplex variations
- **Stuart** - Complete family (Caption, Text, Titling)

### Web Fonts (KMR)
- Desktop formats: OTF, TTF
- Web formats: EOT, WOFF, WOFF2

## Access Methods

### Primary Access: Git Repository
All fonts are now in `~/Developer/docs/fonts/` and tracked with Git LFS:
```bash
# Clone with LFS to get fonts
git clone <repo-url>
git lfs pull

# Or if already cloned
git lfs fetch
git lfs checkout
```

### Local Development
Fonts are directly accessible at:
- **Path**: `~/Developer/docs/fonts/[family-name]/`
- **Example**: `~/Developer/docs/fonts/stuart/StuartTextTrial-Regular.otf`

## Usage in Projects
When referencing fonts in projects:
```css
/* Reference local development fonts */
@font-face {
  font-family: 'Stuart Text';
  src: url('~/Developer/docs/fonts/stuart/StuartTextTrial-Regular.otf');
}

/* Or use relative paths in web projects */
@font-face {
  font-family: 'Stuart Text';
  src: url('../fonts/stuart/StuartTextTrial-Regular.otf');
}
```

## Git LFS Configuration
Font files are already configured for Git LFS tracking via `.gitattributes`:
```bash
# Already tracked extensions:
*.otf filter=lfs diff=lfs merge=lfs -text
*.ttf filter=lfs diff=lfs merge=lfs -text
*.woff filter=lfs diff=lfs merge=lfs -text
*.woff2 filter=lfs diff=lfs merge=lfs -text
*.eot filter=lfs diff=lfs merge=lfs -text
```

To verify LFS is working:
```bash
git lfs ls-files  # List LFS tracked files
git lfs status    # Check LFS status
```
