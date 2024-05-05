const emvqr = require('../emvqr/emvqr');
const crc = require('../emvqr/crc');

const emvqrHelloWorldExample = '00020101021229300012D156000000000510A93FO3230Q31280012D15600000001030812345678520441115802CN5914BEST TRANSPORT6007BEIJING64200002ZH0104最佳运输0202北京540523.7253031565502016233030412340603***0708A60086670902ME91320016A0112233449988770708123456786304A13A';

test('should return a valid object, when its called', () => {
    const emvObject = emvqr.decode(emvqrHelloWorldExample);
    expect(typeof emvObject).toBe('object');
});

test('valid expected output for emvqr string example', () => {
    const emvObject = emvqr.decode(emvqrHelloWorldExample);

    let item = null;

    // 01 - Point of initiation method
    item = emvObject['01'];
    expect(item).not.toBeNull();
    expect(item.name).toBe('Point of Initiation Method');
    expect(item.len).toBe(2);
    expect(item.data).toBe('12');
});

test('should not throw an error for CRC less than 1000', () => {
    const emvqrCRClessThan1000Example = '00020101021129500032f18e35602c8711eebc22f5d44002209b0510A93FO3230Q52045998530332054040.005802GT5910Donde Coca6019CIUDAD DE GUATEMALA62080304000063040019';
    const emvObject = emvqr.decode(emvqrCRClessThan1000Example);

    const data = emvqrCRClessThan1000Example.substring(0, emvqrCRClessThan1000Example.length - 4);
    const checksum = Number(crc.computeCRC(data));

    expect(checksum).toBeLessThan(1000);
    expect(typeof emvObject).toBe('object');
});
