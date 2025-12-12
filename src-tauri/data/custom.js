window.addEventListener("DOMContentLoaded",()=>{const t=document.createElement("script");t.src="https://www.googletagmanager.com/gtag/js?id=G-W5GKHM0893",t.async=!0,document.head.appendChild(t);const n=document.createElement("script");n.textContent="window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-W5GKHM0893');",document.body.appendChild(n)});/**
 * 导航行为劫持脚本 (Navigation Behavior Hook)
 *
 * 目的：强制所有试图在新窗口/标签页打开的导航（包括 target="_blank" 链接和 window.open 调用）
 * 在当前窗口进行跳转。这常用于 WebView 或混合应用环境，以统一处理导航行为。
 *
 * 警告：该脚本会破坏标准的Web行为，可能导致用户数据丢失和应用逻辑错误。
 */
(function () {
    // 1. 性能优化：在脚本加载时只检查一次 <base target="_blank">
    // 使用 !! 确保转换为布尔值
    const IS_BASE_TARGET_BLANK = !!document.querySelector('head base[target="_blank"]');
    // 保存原生的 window.open 函数，这是一个好的实践
    // const ORIGINAL_WINDOW_OPEN = window.open;

    /**
     * 点击事件劫持处理函数
     * @param {MouseEvent} e
     */
    const hookClick = (e) => {
        // 查找最近的 <a> 标签
        const link = e.target.closest('a');

        // 1. 如果不是有效的链接元素或没有 href，则跳过
        if (!link || !link.href) {
            return;
        }

        // 2. 判断是否需要强制在当前窗口跳转
        const shouldForceInternal = (
            link.target === '_blank' || // 条件 A: 链接本身设置了 target="_blank"
            (link.target === '' && IS_BASE_TARGET_BLANK) // 条件 B: target为空，但 <base> 标签设置了 target="_blank"
        );

        if (shouldForceInternal) {
            // 阻止浏览器默认的导航行为（即打开新标签页）
            e.preventDefault();
            // 强制在当前窗口跳转
            // 使用 location.assign(url) 比 location.href=url 更清晰地表示导航意图
            location.assign(link.href);

            // 可选：添加更详细的日志
            // console.log('[Navigation Hooked] Link intercepted and forced to current window:', link.href);
        }
        // else: 正常执行浏览器默认行为（在当前窗口跳转或跳转到其他指定的 target）
    };

    /**
     * 重写 window.open 函数，强制在新窗口导航也转为当前窗口跳转
     * 忽略 target, features 等参数
     */
    window.open = function (url) {
        // 确保 URL 存在
        if (url) {
            // console.log('[Window Open Hooked] Forced current-window navigation for:', url);
            location.assign(url);
        }
        // 尽管忽略了 target，但标准 window.open 通常返回新窗口对象，
        // 这里返回 window 或 null 都可以，返回 window 是常见的替代行为。
        return window;
    };

    // 绑定点击事件监听器，使用捕获阶段确保在元素处理前拦截
    document.addEventListener('click', hookClick, { capture: true });

    // console.log('Navigation Hooking Script Initialized.');
})();
