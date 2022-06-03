import PromptService from './core/prompt/prompt.service';

/**
 * First example class
 */
class App {
  /**
 * First example method of class App
 * @param what Key to identify value in container.
 */
  async run(what: string) {
    const res = await (new PromptService()).input<number>('Число', 'number');
    console.log(res);
  }
}

new App().run('dick');
