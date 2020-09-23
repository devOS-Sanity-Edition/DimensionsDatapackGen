import { Header } from '../components/Header'
import { View } from './View'

export class Generator extends View {
  constructor() {
    super()
  }
  render(): string {
    return `
      ${Header(this, 'Generator')}
    `
  }
}
