const { describeStack } = require('./describeStack');

const mockStack = {
  StackId: 'stack-id',
  StackName: 'serverless-example-dev',
  Description: 'Serverless example',
};

const request = jest.fn();
const provider = { request };

describe('#describeStack', () => {
  it('should get the stack information', async () => {
    request.mockResolvedValue({ Stacks: [mockStack] });
    const des = describeStack({ provider });

    const stack = await des({
      name: 'stack-name',
      region: 'east',
    });

    expect(stack).toEqual(mockStack);
    expect(request).toHaveBeenCalledWith(
      'CloudFormation',
      'describeStacks',
      { StackName: 'stack-name' },
      { region: 'east' }
    );
  });

  it('should return null if stack is not found', async () => {
    request.mockRejectedValue(new Error('this stack does not exist'));
    const des = describeStack({ provider });
    const stack = await des({
      name: 'stack-name',
      region: 'east',
    });

    expect(stack).toBeNull();
  });

  it('should escalate error', async () => {
    request.mockRejectedValue(new Error('something went wrong'));
    const des = describeStack({ provider });
    const stack = des({
      name: 'stack-name',
      region: 'east',
    });

    await expect(() => stack).rejects.toThrowError('something went wrong');
  });
});
