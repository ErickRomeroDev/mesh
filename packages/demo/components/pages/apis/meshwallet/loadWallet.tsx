import { useState } from 'react';
import Codeblock from '../../../ui/codeblock';
import Card from '../../../ui/card';
import SectionTwoCol from '../../../common/sectionTwoCol';
import RunDemoButton from '../../../common/runDemoButton';
import RunDemoResult from '../../../common/runDemoResult';
import { MeshWallet, BlockfrostProvider } from '@meshsdk/core';
import {
  demoMnemonic,
  demoPrivateKey,
  demoCLIKey,
} from '../../../../configs/demo';
import Input from '../../../ui/input';
import Textarea from '../../../ui/textarea';
import ButtonGroup from '../../../ui/buttongroup';
import BlockchainProviderCodeSnippet from '../../../common/blockchainProvider';
import useAppWallet from '../../../../contexts/appWallet';

export default function LoadWallet() {
  const [demoMethod, setDemoMethod] = useState<number>(0);
  const [mnemonic, setMnemonic] = useState<string>(
    JSON.stringify(demoMnemonic, null, 2)
  );
  const [network, setNetwork] = useState<number>(0);
  const [privatekey, setPrivatekey] = useState<string>(demoPrivateKey);
  const [paymentSkey, setPaymentSkey] = useState<string>(
    demoCLIKey.paymentSkey
  );
  const [stakeSkey, setStakeSkey] = useState<string>(demoCLIKey.stakeSkey);

  return (
    <SectionTwoCol
      sidebarTo="initWallet"
      header="Initialize wallet"
      leftFn={Left(mnemonic, network, privatekey, paymentSkey, stakeSkey)}
      rightFn={Right(
        demoMethod,
        setDemoMethod,
        network,
        setNetwork,
        mnemonic,
        setMnemonic,
        privatekey,
        setPrivatekey,
        paymentSkey,
        setPaymentSkey,
        stakeSkey,
        setStakeSkey
      )}
    />
  );
}

function Left(mnemonic, network, privatekey, paymentSkey, stakeSkey) {
  let _mnemonic = JSON.stringify(demoMnemonic);
  try {
    _mnemonic = JSON.stringify(JSON.parse(mnemonic));
  } catch (e) {}

  let codeCommon = `import { MeshWallet } from '@meshsdk/core';\n\n`;

  let code1 = codeCommon;
  code1 += `const wallet = new MeshWallet({\n`;
  code1 += `  networkId: ${network},\n`;
  code1 += `  fetcher: blockchainProvider,\n`;
  code1 += `  submitter: blockchainProvider,\n`;
  code1 += `  key: {\n`;
  code1 += `    type: 'mnemonic',\n`;
  code1 += `    words: ${_mnemonic},\n`;
  code1 += `  },\n`;
  code1 += `});\n`;

  let code2 = `const address = wallet.getChangeAddress();`;

  let code3 = codeCommon;
  code3 += `const wallet = new MeshWallet({\n`;
  code3 += `  networkId: ${network},\n`;
  code3 += `  fetcher: blockchainProvider,\n`;
  code3 += `  submitter: blockchainProvider,\n`;
  code3 += `  key: {\n`;
  code3 += `    type: 'root',\n`;
  code3 += `    bech32: '${privatekey}',\n`;
  code3 += `  },\n`;
  code3 += `});\n`;

  return (
    <>
      <p>You can initialize Mesh Wallet with:</p>
      <ul>
        <li>mnemonic phrases</li>
        <li>Cardano CLI generated keys</li>
        <li>private keys</li>
      </ul>
      <p>Lets import a blockchain provider:</p>
      <BlockchainProviderCodeSnippet />
      <h3>Mnemonic phrases</h3>
      <p>We can load wallet with mnemonic phrases:</p>
      <Codeblock data={code1} isJson={false} />
      <p>
        With the <code>wallet</code> loaded, you can sign transactions, we will
        see how to do this in the next section, for now lets get the wallet's
        address:
      </p>
      <Codeblock data={code2} isJson={false} />

      <h3>Private keys</h3>
      <p>We can load wallet with private keys:</p>
      <Codeblock data={code3} isJson={false} />
    </>
  );
}

function Right(
  demoMethod,
  setDemoMethod,
  network,
  setNetwork,
  mnemonic,
  setMnemonic,
  privatekey,
  setPrivatekey,
  paymentSkey,
  setPaymentSkey,
  stakeSkey,
  setStakeSkey
) {
  const [loading, setLoading] = useState<boolean>(false);
  const { setWallet, setWalletNetwork } = useAppWallet();
  const [responseAddress, setResponseAddress] = useState<null | any>(null);
  const [responseError, setResponseError] = useState<null | any>(null);

  async function runDemoLoadWallet() {
    setLoading(true);
    setResponseError(null);
    setResponseAddress(null);
    setWallet({} as MeshWallet);

    const blockchainProvider = new BlockfrostProvider(
      process.env.NEXT_PUBLIC_BLOCKFROST_API_KEY_PREPROD!
    );

    if (demoMethod == 0) {
      let _mnemonic = [];
      try {
        _mnemonic = JSON.parse(mnemonic);
      } catch (e) {
        setResponseError('Mnemonic input is not a valid array.');
      }

      try {
        if (_mnemonic.length) {
          const _wallet = new MeshWallet({
            networkId: network,
            fetcher: blockchainProvider,
            submitter: blockchainProvider,
            key: {
              type: 'mnemonic',
              words: _mnemonic,
            },
          });
          setWallet(_wallet);
          setWalletNetwork(network);
          const address = _wallet.getChangeAddress();
          setResponseAddress(address);
        }
      } catch (error) {
        setResponseError(`${error}`);
      }
    }
    if (demoMethod == 1) {
      try {
        const _wallet = new MeshWallet({
          networkId: network,
          fetcher: blockchainProvider,
          submitter: blockchainProvider,
          key: {
            type: 'root',
            bech32: privatekey,
          },
        });
        setWallet(_wallet);
        setWalletNetwork(network);
        const address = _wallet.getChangeAddress();
        setResponseAddress(address);
      } catch (error) {
        setResponseError(`${error}`);
      }
    }
    if (demoMethod == 2) {
      try {
        const stake = stakeSkey?.length > 0 ? stakeSkey : undefined;
        const _wallet = new MeshWallet({
          networkId: network,
          fetcher: blockchainProvider,
          submitter: blockchainProvider,
          key: {
            type: 'cli',
            payment: paymentSkey,
            stake,
          },
        });
        setWallet(_wallet);
        setWalletNetwork(network);
        const address = _wallet.getChangeAddress();
        setResponseAddress(address);
      } catch (error) {
        setResponseError(`${error}`);
      }
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <ButtonGroup
          items={[
            {
              key: 0,
              label: 'Mnemonic phrases',
              onClick: () => setDemoMethod(0),
            },
            {
              key: 1,
              label: 'Private key',
              onClick: () => setDemoMethod(1),
            },
            {
              key: 2,
              label: 'CLI keys',
              onClick: () => setDemoMethod(2),
            },
          ]}
          currentSelected={demoMethod}
        />

        <InputTable
          demoMethod={demoMethod}
          network={network}
          setNetwork={setNetwork}
          mnemonic={mnemonic}
          setMnemonic={setMnemonic}
          privatekey={privatekey}
          setPrivatekey={setPrivatekey}
          paymentSkey={paymentSkey}
          setPaymentSkey={setPaymentSkey}
          stakeSkey={stakeSkey}
          setStakeSkey={setStakeSkey}
        />
        <RunDemoButton
          runDemoFn={runDemoLoadWallet}
          loading={loading}
          response={responseAddress}
          label="Load wallet and get address"
        />
        <RunDemoResult response={responseAddress} label="Wallet's address" />
        <RunDemoResult response={responseError} label="Error" />
      </Card>
    </>
  );
}

function InputTable({
  demoMethod,
  network,
  setNetwork,
  mnemonic,
  setMnemonic,
  privatekey,
  setPrivatekey,
  paymentSkey,
  setPaymentSkey,
  stakeSkey,
  setStakeSkey,
}) {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 m-0">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
          Load wallet with {demoMethod == 0 && 'mnemonic phrases'}
          {demoMethod == 1 && 'private keys'}
          {demoMethod == 2 && 'CLI generated keys'}
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Provide the {demoMethod == 0 && 'mnemonic phrases'}
            {demoMethod == 1 && 'private keys'}
            {demoMethod == 2 && 'CLI generated keys'} to recover your wallet.
            After initializing the <code>MeshWallet</code>, we will get the
            wallet's payment address.
          </p>
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Note: Mesh Playground is safe if you really have to recover your
            Mainnet wallet, but recovering your testing wallet on Mesh
            Playground is recommended.
          </p>
        </caption>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td>
              {demoMethod == 0 && (
                <>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Mnemonic phrases
                  </label>
                  <Textarea
                    value={mnemonic}
                    onChange={(e) => setMnemonic(e.target.value)}
                    rows={8}
                  />
                </>
              )}
              {demoMethod == 1 && (
                <Input
                  value={privatekey}
                  onChange={(e) => setPrivatekey(e.target.value)}
                  placeholder="Private key"
                  label="Private key"
                />
              )}
              {demoMethod == 2 && (
                <>
                  <Input
                    value={paymentSkey}
                    onChange={(e) => setPaymentSkey(e.target.value)}
                    placeholder="Payment signing key"
                    label="Payment signing key"
                  />
                  <Input
                    value={stakeSkey}
                    onChange={(e) => setStakeSkey(e.target.value)}
                    placeholder="Stake signing key (optional)"
                    label="Stake signing key (optional)"
                  />
                </>
              )}
              <Input
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                placeholder="Network"
                label="Network"
                type="number"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
