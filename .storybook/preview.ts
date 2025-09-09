import type {Preview} from '@storybook/vue3-vite'
import {setup} from '@storybook/vue3-vite'
import '../src/styles/main.scss'
import KrdsVue from '../src/index'

// KRDS Vue 플러그인 설정
setup(app => {
    // KRDS Vue 플러그인 사용 (컴포넌트 + 디렉티브 자동 등록)
    app.use(KrdsVue)
})

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i
            }
        },
        a11y: {
            // 'todo' - show a11y violations in the test UI only
            // 'error' - fail CI on a11y violations
            // 'off' - skip a11y checks entirely
            test: 'todo'
        }
    },
    tags: ['autodocs'],
    globalTypes: {
        theme: {
            name: 'Theme',
            description: 'KRDS 컬러 모드를 전환합니다',
            table: {
                defaultValue: {summary: 'light'}
            },
            toolbar: {
                icon: 'paintbrush',
                items: [
                    {value: 'light', title: 'Light', right: '☀️'},
                    {value: 'high-contrast', title: 'Dark', right: '🌙'},
                ],
                showName: true
            }
        }
    },
    decorators: [
        (story, context) => {
            const theme = context.globals.theme || 'light';
            
            // iframe의 html 요소에 data-krds-mode 속성 설정
            if (typeof window !== 'undefined' && window.document) {
                window.document.documentElement.setAttribute('data-krds-mode', theme);
            }
            
            return story();
        }
    ]
}

export default preview
