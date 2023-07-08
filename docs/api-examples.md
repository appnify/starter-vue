---
outline: deep
---

# Runtime API Examples

This page demonstrates usage of some of the runtime APIs provided by VitePress.
The main `useData()` API can be used to access site, theme, and page data for the current page. It works in both `.md` and `.vue` files:

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## Results

### Theme Data
<pre>{{ theme }}</pre>

### Page Data
<pre>{{ page }}</pre>

### Page Frontmatter
<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter, localeIndex } = useData()
</script>

## 输出结果

### 主题数据
{{localeIndex}}
<pre>{{ theme }}</pre>

### 页面数据
<pre>{{ page }}</pre>

### 页面前置数据
<pre>{{ frontmatter }}</pre>

## 更多

Check out the documentation for the [full list of runtime APIs](https://vitepress.dev/reference/runtime-api#usedata).
