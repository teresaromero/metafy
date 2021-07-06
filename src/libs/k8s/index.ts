import * as k8s from '@kubernetes/client-node'

export class KubeClient {
  private static config: k8s.KubeConfig

  protected static getConfig(): k8s.KubeConfig {
    if (!KubeClient.config) {
      const kc = new k8s.KubeConfig()
      kc.loadFromDefault()
      KubeClient.config = kc
    }

    return KubeClient.config
  }

  protected static clientAppsV1Api(): k8s.AppsV1Api {
    return this.getConfig().makeApiClient(k8s.AppsV1Api)
  }

  static async getDeployments(
    namespace: string
  ): Promise<k8s.V1DeploymentList> {
    const { body } = await this.clientAppsV1Api().listNamespacedDeployment(
      namespace
    )
    return body
  }

  static async getStatefulSet(
    namespace: string
  ): Promise<k8s.V1StatefulSetList> {
    const { body } = await this.clientAppsV1Api().listNamespacedStatefulSet(
      namespace
    )
    return body
  }
}
