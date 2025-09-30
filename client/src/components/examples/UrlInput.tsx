import UrlInput from '../UrlInput';

export default function UrlInputExample() {
  return (
    <UrlInput 
      onAnalyze={(url) => console.log('Analyzing:', url)} 
    />
  );
}
