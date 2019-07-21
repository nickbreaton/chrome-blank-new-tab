default:
	rm dist.zip || true
	zip -r dist.zip . -x *.git*
