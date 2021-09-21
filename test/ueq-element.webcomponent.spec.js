import { UeqElementWebcomponent, i18n } from '../lib/ueq-element.esm';
import { expect, fixture } from '@open-wc/testing';


describe('UEQ Element e2e test', () => {
    const TAG_NAME = 'ueq-element';

    it('Element is form element', () => {
        expect(UeqElementWebcomponent.formAssociated).to.eq(true);
    })

    it('default behaviour', async () => {
        const elName = 'ueq-test';
        const ueqElement = await fixture(`<${TAG_NAME} name="${elName}"></${TAG_NAME}>`);
        expect(ueqElement).to.be.instanceOf(UeqElementWebcomponent);
        expect(ueqElement.getAttribute('name')).equal('ueq-test');
        // Initial value is null
        expect(ueqElement.getAttribute('value')).equal(null);
        expect(ueqElement.object).to.deep.eq({});
        // All fields exist and are empty
        const elements = ueqElement.shadowRoot.querySelectorAll('input[type=radio]');
        expect(elements.length).to.equal(26 * 7);
        // Translations are english by default
        expect(ueqElement.translation.code).to.eq('en-US');
        const textValues = [
            ...ueqElement.shadowRoot.querySelectorAll('span.minimum'),
            ...ueqElement.shadowRoot.querySelectorAll('span.maximum')
        ].map(el => el.innerText);
        const trans = Object.values(i18n.en.default.translations);
        textValues.forEach(v => {
            expect(trans).to.include(v);
        })
        // Non-required field is valid by default
        expect(ueqElement.validity.valid).to.eq(true);
    });

    const assertGerman = (ueqElement) => {
        expect(ueqElement).to.be.instanceOf(UeqElementWebcomponent);
        // Translations are english by default
        expect(ueqElement.translation.code).to.eq('de-DE');
        const textValues = [
            ...ueqElement.shadowRoot.querySelectorAll('span.minimum'),
            ...ueqElement.shadowRoot.querySelectorAll('span.maximum')
        ].map(el => el.innerText);
        expect(textValues.length).to.equal(26 * 2);

        const trans = Object.values(i18n.de.default.translations);
        textValues.forEach(v => {
            expect(trans).to.include(v);
        });
    }

    describe('language changed tio german', async () => {
        const elName = 'ueq-test';
        describe('Case 1: Setting on element', async () => {
            it('Explicit', async () => {
                assertGerman(await fixture(`<${TAG_NAME} name="${elName}" lang="de-DE"></${TAG_NAME}>`));
            });
            it('Fallback to default', async () => {
                assertGerman(await fixture(`<${TAG_NAME} name="${elName}" lang="de"></${TAG_NAME}>`));
            });
            it('Non-existing secondary: fall back to default', async () => {
                assertGerman(await fixture(`<${TAG_NAME} name="${elName}" lang="de-AT"></${TAG_NAME}>`));
            });
            it('Alternative writing', async () => {
                assertGerman(await fixture(`<${TAG_NAME} name="${elName}" lang="de_de"></${TAG_NAME}>`));
            });
        });

        describe('Case 2: Setting via parent', async () => {
            it('Explicit', async () => {
                assertGerman((await fixture(`
            <form lang="de-DE"><span>
                <${TAG_NAME} name="${elName}"></${TAG_NAME}>
            </span></form>`
                )).querySelector(TAG_NAME));
            });
            it('Fallback to default', async () => {
                assertGerman((await fixture(`
            <form lang="de"><span>
                <${TAG_NAME} name="${elName}"></${TAG_NAME}>
            </span></form>`
                )).querySelector(TAG_NAME));
            });
            it('Non-existing secondary: fall back to default', async () => {
                assertGerman((await fixture(`
            <form lang="de-AT"><span>
                <${TAG_NAME} name="${elName}"></${TAG_NAME}>
            </span></form>`
                )).querySelector(TAG_NAME));
            });
            it('Alternative writing', async () => {
                assertGerman((await fixture(`
            <form lang="de_de"><span>
                <${TAG_NAME} name="${elName}"></${TAG_NAME}>
            </span></form>`
                )).querySelector(TAG_NAME));
            });
        });
    });
})
